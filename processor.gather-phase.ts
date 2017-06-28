import * as Model from "./model";
import * as ts from "typescript";
import * as path from "path";
import { Identifier } from "typescript";
import { type } from "os";

function hasExportModifier(node: ts.Node) {
    return !node.modifiers || !node.modifiers.find(e => e.kind == ts.SyntaxKind.ExportKeyword);
}

function guessName(identifier: ts.Identifier | ts.BindingPattern): string {
    if (identifier.kind == ts.SyntaxKind.Identifier)
        return identifier.text;
    return "[UNKNOWN]";
}

/**
 * Constructs the correspondance between Typescript types
 * and Java types.
 *
 * One typescript type can have several linked java types.
 */
export class GatherPhase {
    symbols: Map<ts.Symbol, Model.JavaNode[]> = new Map();
    types: Set<ts.Type> = new Set()

    variables: {
        declarationNode: ts.Node;
        name: string;
    }[] = [];

    constructor(private baseJavaPackage: string,
        private javaPackages: { [key: string]: string },
        private program: ts.Program) {
    }

    private addVariableStatement(statement: ts.VariableStatement) {
        statement.declarationList.declarations.forEach((declaration) => {
            let t = this.program.getTypeChecker().getTypeFromTypeNode(declaration.type)
            this.registerType(t)
            this.variables.push({ declarationNode: declaration, name: guessName(declaration.name) });
        });
    }

    private registerType(type: ts.Type) {
        if (type)
            this.types.add(type)
    }

    seen: Set<any> = new Set();

    sumup() {
        for (let type of this.types.values()) {
            this.analyzeType(type)
        }
    }

    analyzeType(type: ts.Type, deep: number = 0) {
        if (deep > 15)
            return

        let prefix = ''
        for (let i = 0; i < deep; i++)
            prefix += '\t'

        if (type == null) {
            console.log(`${prefix}NO TYPE`)
            return
        }
        let typeName = type.getSymbol() ? type.getSymbol().getName() : "(anonymous type)"
        console.log(`${prefix}TYPE : ${typeName}`);
        let flags = type.getFlags() as number

        let o = ts.TypeFlags

        let keys = Object.keys(ts.TypeFlags)

        console.log(`${prefix}RAW FLAG: ${flags}`)
        keys.filter(k => parseInt(k)).forEach(flag => {
            let f = parseInt(flag);
            if ((f & flags) === f)
                console.log(`${prefix}FLAG : ${ts.TypeFlags[flag]}`)
        })

        let baseTypes = type.getBaseTypes()
        if (baseTypes && baseTypes.length > 0) {
            console.log(`${prefix}BASE TYPES:`)
            baseTypes.forEach((baseType => this.analyzeType(baseType, deep+1)))
        }

        let properties = type.getProperties()
        if (properties) {
            console.log(`${prefix}PROPERTIES`)
            for (let property of properties) {
                if ("baobab" == property.getName())
                    console.log(`yop`)
                let propertyType = this.program.getTypeChecker().getTypeAtLocation(property.valueDeclaration)

                //this.program.getTypeChecker().getDeclaredTypeOfSymbol(property)
                console.log(`${prefix}PROPERTY ${property.getName()}`)
                this.analyzeType(propertyType, deep+1)
                console.log(`${prefix}END PROPERTY ${property.getName()}`)
            }
        }

        console.log(`${prefix}END TYPE ${typeName}`)
    }

    addTypesFromSourceFile(sourceFile: ts.SourceFile, onlyExportedSymbols: boolean) {
        ts.forEachChild(sourceFile, (node) => {
            if (node.kind == ts.SyntaxKind.VariableStatement) {
                this.addVariableStatement(node as ts.VariableStatement);
                return;
            }

            if (node.kind == ts.SyntaxKind.InterfaceDeclaration) {
                (node as ts.InterfaceDeclaration);
                let type = this.program.getTypeChecker().getTypeAtLocation(node);
                this.registerType(type);
                let symbol = type.symbol;
                while (symbol.flags & ts.SymbolFlags.Alias) {
                    console.log(`aliased ${symbol.name}`);
                    symbol = this.program.getTypeChecker().getAliasedSymbol(symbol);
                }
                console.log(`INTERFACE ${guessName((node as ts.InterfaceDeclaration).name)} ${type} ${symbol.name}`);
                this.checkSeen(type, 'type');
                this.checkSeen(symbol, 'symbol');
                return;
            }

            if (node.kind == ts.SyntaxKind.ClassDeclaration) {
                let type = this.program.getTypeChecker().getTypeAtLocation(node);
                this.registerType(type);
                let symbol = type.symbol;
                console.log(`CLASS ${guessName((node as ts.ClassDeclaration).name)} ${type} ${symbol.name}`);
                this.checkSeen(type, 'type');
                this.checkSeen(symbol, 'symbol');
                return;
            }

            console.log(`SyntaxKind: ${ts.SyntaxKind[node.kind]}`);
        });
    }

    checkSeen(object, title = '') {
        if (this.seen.has(object)) {
            console.log(`seen ${title} already seen ${object}`);
            return;
        }

        this.seen.add(object);
    }
}
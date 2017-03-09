package fr.lteconsulting.angular2gwt.client.interop.ng.core;

import jsinterop.annotations.JsType;
import fr.lteconsulting.angular2gwt.client.JsArray;
import jsinterop.annotations.JsConstructor;

/**
  * Generated from tests\@angular\compiler\src\template_parser\template_ast.d.ts
  * Package ng.core
  * Name ElementAst
  * An element declaration in a template.
  **/
@JsType( isNative=true, namespace="ng.core" )
public class ElementAst extends TemplateAst {
    public String name;
    public JsArray<AttrAst> attrs;
    public JsArray<BoundElementPropertyAst> inputs;
    public JsArray<BoundEventAst> outputs;
    public JsArray<ReferenceAst> references;
    public JsArray<DirectiveAst> directives;
    public JsArray<ProviderAst> providers;
    public boolean hasViewContainer;
    public JsArray<TemplateAst> children;
    public int ngContentIndex;
    public ParseSourceSpan sourceSpan;
    public ParseSourceSpan endSourceSpan;
    @JsConstructor
    public ElementAst(String name,JsArray<AttrAst> attrs,JsArray<BoundElementPropertyAst> inputs,JsArray<BoundEventAst> outputs,JsArray<ReferenceAst> references,JsArray<DirectiveAst> directives,JsArray<ProviderAst> providers,boolean hasViewContainer,JsArray<TemplateAst> children,int ngContentIndex,ParseSourceSpan sourceSpan,ParseSourceSpan endSourceSpan) {}
    public native  Object visit(TemplateAstVisitor visitor,Object context);
}
package fr.lteconsulting.angular2gwt.client.interop.ng.core;

import jsinterop.annotations.JsType;
import fr.lteconsulting.angular2gwt.client.JsArray;

/**
  * Generated from tests\@angular\compiler\src\output\abstract_emitter.d.ts
  * Package ng.core
  * Name OutputEmitter
  * 
  **/
@JsType( isNative=true, namespace="ng.core" )
public interface OutputEmitter  {
     String emitStatements(String moduleUrl,JsArray<Statement> stmts,JsArray<String> exportedVars);
}
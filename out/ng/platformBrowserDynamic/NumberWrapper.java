package fr.lteconsulting.angular2gwt.client.interop.ng.platformBrowserDynamic;

import jsinterop.annotations.JsType;

/**
  * Generated from tests\@angular\platform-browser-dynamic\src\facade\lang.d.ts
  * Package ng.platformBrowserDynamic
  * Name NumberWrapper
  * 
  **/
@JsType( isNative=true, namespace="ng.platformBrowserDynamic" )
public class NumberWrapper  {
    public static native  int parseIntAutoRadix(String text);
    public static native  boolean isNumeric(Object value);
}
package fr.lteconsulting.angular2gwt.client.interop.rxjs;

import jsinterop.annotations.JsType;
import fr.lteconsulting.angular2gwt.client.JsFunction2;
import jsinterop.annotations.JsConstructor;

/**
  * Generated from tests\rxjs\scheduler\Action.d.ts
  * Package rxjs
  * Name Action
  * A unit of work to be executed in a {@link Scheduler}. An action is typically
  * created from within a Scheduler and an RxJS user does not need to concern
  * themselves about creating and manipulating an Action.
  * 
  * ```ts
  * class Action<T> extends Subscription {
  *    new (scheduler: Scheduler, work: (state?: T) => void);
  *    schedule(state?: T, delay: number = 0): Subscription;
  * }
  * ```
  **/
@JsType( isNative=true, namespace="rxjs" )
public class Action<T> extends Subscription {
    @JsConstructor
    public Action(Scheduler scheduler,JsFunction2<Action<T>,T,Void> work) {}
    public native  Subscription schedule(T /* optional */ state,int /* optional */ delay);
}
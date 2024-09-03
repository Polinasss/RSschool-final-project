import{d as F}from"./chunk-P6FRCD3I.js";import{Aa as v,Ba as g,Db as R,Qa as w,Ta as D,Wa as y,n as m,na as _,oa as E,pb as d,tb as C,zb as M}from"./chunk-LLXA3JIY.js";var A=class{get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}constructor(t=!1,s,e=!0,i){this._multiple=t,this._emitChanges=e,this.compareWith=i,this._selection=new Set,this._deselectedToEmit=[],this._selectedToEmit=[],this.changed=new m,s&&s.length&&(t?s.forEach(r=>this._markSelected(r)):this._markSelected(s[0]),this._selectedToEmit.length=0)}select(...t){this._verifyValueAssignment(t),t.forEach(e=>this._markSelected(e));let s=this._hasQueuedChanges();return this._emitChangeEvent(),s}deselect(...t){this._verifyValueAssignment(t),t.forEach(e=>this._unmarkSelected(e));let s=this._hasQueuedChanges();return this._emitChangeEvent(),s}setSelection(...t){this._verifyValueAssignment(t);let s=this.selected,e=new Set(t);t.forEach(r=>this._markSelected(r)),s.filter(r=>!e.has(this._getConcreteValue(r,e))).forEach(r=>this._unmarkSelected(r));let i=this._hasQueuedChanges();return this._emitChangeEvent(),i}toggle(t){return this.isSelected(t)?this.deselect(t):this.select(t)}clear(t=!0){this._unmarkAll();let s=this._hasQueuedChanges();return t&&this._emitChangeEvent(),s}isSelected(t){return this._selection.has(this._getConcreteValue(t))}isEmpty(){return this._selection.size===0}hasValue(){return!this.isEmpty()}sort(t){this._multiple&&this.selected&&this._selected.sort(t)}isMultipleSelection(){return this._multiple}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(t){t=this._getConcreteValue(t),this.isSelected(t)||(this._multiple||this._unmarkAll(),this.isSelected(t)||this._selection.add(t),this._emitChanges&&this._selectedToEmit.push(t))}_unmarkSelected(t){t=this._getConcreteValue(t),this.isSelected(t)&&(this._selection.delete(t),this._emitChanges&&this._deselectedToEmit.push(t))}_unmarkAll(){this.isEmpty()||this._selection.forEach(t=>this._unmarkSelected(t))}_verifyValueAssignment(t){t.length>1&&this._multiple}_hasQueuedChanges(){return!!(this._deselectedToEmit.length||this._selectedToEmit.length)}_getConcreteValue(t,s){if(this.compareWith){s=s??this._selection;for(let e of s)if(this.compareWith(t,e))return e;return t}else return t}};var j=(()=>{let t=class t{constructor(){this._listeners=[]}notify(e,i){for(let r of this._listeners)r(e,i)}listen(e){return this._listeners.push(e),()=>{this._listeners=this._listeners.filter(i=>e!==i)}}ngOnDestroy(){this._listeners=[]}};t.\u0275fac=function(i){return new(i||t)},t.\u0275prov=_({token:t,factory:t.\u0275fac,providedIn:"root"});let o=t;return o})();var c=class{attach(t){return this._attachedHost=t,t.attach(this)}detach(){let t=this._attachedHost;t!=null&&(this._attachedHost=null,t.detach())}get isAttached(){return this._attachedHost!=null}setAttachedHost(t){this._attachedHost=t}},u=class extends c{constructor(t,s,e,i,r){super(),this.component=t,this.viewContainerRef=s,this.injector=e,this.componentFactoryResolver=i,this.projectableNodes=r}},f=class extends c{constructor(t,s,e,i){super(),this.templateRef=t,this.viewContainerRef=s,this.context=e,this.injector=i}get origin(){return this.templateRef.elementRef}attach(t,s=this.context){return this.context=s,super.attach(t)}detach(){return this.context=void 0,super.detach()}},p=class extends c{constructor(t){super(),this.element=t instanceof y?t.nativeElement:t}},l=class{constructor(){this._isDisposed=!1,this.attachDomPortal=null}hasAttached(){return!!this._attachedPortal}attach(t){if(t instanceof u)return this._attachedPortal=t,this.attachComponentPortal(t);if(t instanceof f)return this._attachedPortal=t,this.attachTemplatePortal(t);if(this.attachDomPortal&&t instanceof p)return this._attachedPortal=t,this.attachDomPortal(t)}detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn()}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=!0}setDisposeFn(t){this._disposeFn=t}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null)}};var P=class extends l{constructor(t,s,e,i,r){super(),this.outletElement=t,this._componentFactoryResolver=s,this._appRef=e,this._defaultInjector=i,this.attachDomPortal=h=>{this._document;let n=h.element;n.parentNode;let a=this._document.createComment("dom-portal");n.parentNode.insertBefore(a,n),this.outletElement.appendChild(n),this._attachedPortal=h,super.setDisposeFn(()=>{a.parentNode&&a.parentNode.replaceChild(n,a)})},this._document=r}attachComponentPortal(t){let e=(t.componentFactoryResolver||this._componentFactoryResolver).resolveComponentFactory(t.component),i;return t.viewContainerRef?(i=t.viewContainerRef.createComponent(e,t.viewContainerRef.length,t.injector||t.viewContainerRef.injector,t.projectableNodes||void 0),this.setDisposeFn(()=>i.destroy())):(i=e.create(t.injector||this._defaultInjector||w.NULL),this._appRef.attachView(i.hostView),this.setDisposeFn(()=>{this._appRef.viewCount>0&&this._appRef.detachView(i.hostView),i.destroy()})),this.outletElement.appendChild(this._getComponentRootNode(i)),this._attachedPortal=t,i}attachTemplatePortal(t){let s=t.viewContainerRef,e=s.createEmbeddedView(t.templateRef,t.context,{injector:t.injector});return e.rootNodes.forEach(i=>this.outletElement.appendChild(i)),e.detectChanges(),this.setDisposeFn(()=>{let i=s.indexOf(e);i!==-1&&s.remove(i)}),this._attachedPortal=t,e}dispose(){super.dispose(),this.outletElement.remove()}_getComponentRootNode(t){return t.hostView.rootNodes[0]}};var $=(()=>{let t=class t extends l{constructor(e,i,r){super(),this._componentFactoryResolver=e,this._viewContainerRef=i,this._isInitialized=!1,this.attached=new D,this.attachDomPortal=h=>{this._document;let n=h.element;n.parentNode;let a=this._document.createComment("dom-portal");h.setAttachedHost(this),n.parentNode.insertBefore(a,n),this._getRootNode().appendChild(n),this._attachedPortal=h,super.setDisposeFn(()=>{a.parentNode&&a.parentNode.replaceChild(n,a)})},this._document=r}get portal(){return this._attachedPortal}set portal(e){this.hasAttached()&&!e&&!this._isInitialized||(this.hasAttached()&&super.detach(),e&&super.attach(e),this._attachedPortal=e||null)}get attachedRef(){return this._attachedRef}ngOnInit(){this._isInitialized=!0}ngOnDestroy(){super.dispose(),this._attachedRef=this._attachedPortal=null}attachComponentPortal(e){e.setAttachedHost(this);let i=e.viewContainerRef!=null?e.viewContainerRef:this._viewContainerRef,h=(e.componentFactoryResolver||this._componentFactoryResolver).resolveComponentFactory(e.component),n=i.createComponent(h,i.length,e.injector||i.injector,e.projectableNodes||void 0);return i!==this._viewContainerRef&&this._getRootNode().appendChild(n.hostView.rootNodes[0]),super.setDisposeFn(()=>n.destroy()),this._attachedPortal=e,this._attachedRef=n,this.attached.emit(n),n}attachTemplatePortal(e){e.setAttachedHost(this);let i=this._viewContainerRef.createEmbeddedView(e.templateRef,e.context,{injector:e.injector});return super.setDisposeFn(()=>this._viewContainerRef.clear()),this._attachedPortal=e,this._attachedRef=i,this.attached.emit(i),i}_getRootNode(){let e=this._viewContainerRef.element.nativeElement;return e.nodeType===e.ELEMENT_NODE?e:e.parentNode}};t.\u0275fac=function(i){return new(i||t)(d(C),d(M),d(F))},t.\u0275dir=g({type:t,selectors:[["","cdkPortalOutlet",""]],inputs:{portal:[0,"cdkPortalOutlet","portal"]},outputs:{attached:"attached"},exportAs:["cdkPortalOutlet"],standalone:!0,features:[R]});let o=t;return o})();var G=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=v({type:t}),t.\u0275inj=E({});let o=t;return o})();export{A as a,j as b,u as c,f as d,l as e,P as f,$ as g,G as h};

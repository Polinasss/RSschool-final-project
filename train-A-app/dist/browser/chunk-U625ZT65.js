import{a as xe,b as be}from"./chunk-CB3TRM6G.js";import{a as y,b as U,c as $e}from"./chunk-AZEH5CYS.js";import{a as Me}from"./chunk-RIKPSUBX.js";import"./chunk-2OK2SD6J.js";import{a as B}from"./chunk-O4VMZ2NP.js";import"./chunk-WMUHE67Z.js";import"./chunk-I6WBTFIN.js";import"./chunk-MU6QX773.js";import{a as ve,b as ye}from"./chunk-YF65DTUQ.js";import{a as L}from"./chunk-OATETTAM.js";import{a as Fe,b as Ce}from"./chunk-VZCW3W3G.js";import"./chunk-KW5VZNQM.js";import{a as he,g as ge,h as Se}from"./chunk-A2J7V4S5.js";import"./chunk-5GEB22Y5.js";import"./chunk-SWG7LFT6.js";import"./chunk-EZOB3TJ4.js";import"./chunk-7CFUQ7C3.js";import"./chunk-RGNDWIHZ.js";import{a as ne}from"./chunk-MGBRLVRV.js";import{d as j,f as ae,g as se,k as pe,n as le,o as ce,p as me,s as de,u as ue}from"./chunk-PDIALKXB.js";import{V as re,Z as fe,aa as _e}from"./chunk-WBXFGMZG.js";import"./chunk-PMXBU2MZ.js";import{l as I,m as ie,n as oe,o as P}from"./chunk-P6FRCD3I.js";import{A as $,Cc as m,Dc as d,Hc as te,Ib as f,Ka as O,Kb as l,La as R,Rb as A,Sb as k,Tb as D,Ub as a,Vb as s,Wb as N,Xb as z,Yb as W,Zb as q,_b as E,a as G,dc as C,fc as h,gc as H,hc as J,i as T,ia as Q,jc as K,kc as X,lc as Y,ob as p,oc as Z,pc as _,qc as w,rc as ee,ta as u,xc as v,z as b,za as F}from"./chunk-LLXA3JIY.js";function Te(t,o){if(t&1&&(a(0,"mat-option",12),_(1),s()),t&2){let n=o.$implicit;l("value",n.id),p(),ee(" ",n.city," ")}}function Ne(t,o){if(t&1){let n=E();a(0,"div")(1,"mat-form-field",8)(2,"mat-label"),_(3,"Select station"),s(),a(4,"mat-select",10),C("selectionChange",function(){let i=O(n).index,r=h();return R(r.onStationsChange(i))}),f(5,Te,2,2,"mat-option",11),m(6,"async"),s()()()}if(t&2){let n=o.index,e=h();p(4),l("formControlName",n),p(),l("ngForOf",d(6,2,e.filteredStationOptionsMap[n]))}}function we(t,o){if(t&1&&(a(0,"mat-option",12),_(1),s()),t&2){let n=o.$implicit;l("value",n.code),p(),w(n.name)}}function Ie(t,o){if(t&1){let n=E();a(0,"mat-form-field",8)(1,"mat-label"),_(2,"Select carriage"),s(),a(3,"mat-select",10),C("selectionChange",function(){let i=O(n).$index,r=h();return R(r.onCarriagesChange(i))}),k(4,we,2,2,"mat-option",12,A),m(6,"async"),s()()}if(t&2){let n=o.$index,e=h();p(3),l("formControlName",n),p(),D(d(6,1,e.carriages$))}}var Re=(()=>{let o=class o{constructor(){this.editMode="create",this.carriageFacade=u(B),this.stationFacade=u(L),this.routeFacade=u(U),this.panelService=u(y),this.fb=u(de),this.MIN_ITEMS_IN_ROUTE=4,this.carriages$=this.carriageFacade.carriage$,this.stations$=this.stationFacade.station$,this.filteredStationOptionsMap={},this.panel$=this.panelService.panelState$.pipe(ne())}ngOnInit(){this.routesForm=this.fb.group({selectStations:this.fb.array([this.createSelectControl()],j.minLength(this.MIN_ITEMS_IN_ROUTE)),selectCarriages:this.fb.array([this.createSelectControl()],j.minLength(this.MIN_ITEMS_IN_ROUTE))})}ngAfterViewInit(){this.panel$.subscribe(e=>{e.panelId==="panelRoute"&&(this.editMode=e.editMode??"create",this.routeForUpdating=e.route??null,this.cleanFormPanel(),window.scrollTo({top:0,behavior:"smooth"}),this.editMode==="create"?this.updateFilteredStationOptions(0):this.editMode&&this.routeForUpdating&&this.updateFormValues())})}get stations(){return this.routesForm.get("selectStations")}get carriages(){return this.routesForm.get("selectCarriages")}createSelectControl(e=null){return this.fb.control(e)}updateFormValues(){this.routeForUpdating&&(this.stations.clear(),this.carriages.clear(),this.routeForUpdating.path.forEach((e,i,r)=>{this.generateStationOptions(i,e).subscribe(()=>this.stations.push(this.createSelectControl(e))),i===r.length-1&&this.updateFilteredStationOptions(i+1)}),this.routeForUpdating.carriages.forEach(e=>{this.carriages.push(this.createSelectControl(e))}),this.stations.push(this.createSelectControl()),this.carriages.push(this.createSelectControl()))}generateStationOptions(e,i){return this.filteredStationOptionsMap[e]=$([this.stations$]).pipe(b(([r])=>{let c=r.filter(S=>S.connectedTo.some(M=>M.id===i)),g=r.find(S=>S.id===i);return g&&!c.includes(g)&&(c=[g,...c]),c})),this.filteredStationOptionsMap[e]}updateFilteredStationOptions(e){if(e===0)this.filteredStationOptionsMap[e]=this.stations$;else{let i=this.stations.at(e-1)?.value;this.filteredStationOptionsMap[e]=$([this.stations$]).pipe(b(([r])=>r.filter(c=>c.connectedTo.some(g=>g.id===i))))}}onStationsChange(e){if(e!==this.stations.length-1)for(let i=this.stations.length-1;i>e;i-=1)this.stations.removeAt(i);this.stations.push(this.createSelectControl()),this.updateFilteredStationOptions(e+1)}onCarriagesChange(e){e===this.carriages.length-1&&this.carriages.push(this.createSelectControl())}removeLastElement(e){return e.pop(),e}cleanFormPanel(){this.routesForm.reset(),this.clearFormArray(this.stations),this.clearFormArray(this.carriages),Object.keys(this.filteredStationOptionsMap).forEach(e=>delete this.filteredStationOptionsMap[+e])}clearFormArray(e){for(;e.length>1;)e.removeAt(1)}onSubmit(){if(this.routesForm.valid){let e={path:this.removeLastElement(this.stations.value),carriages:this.removeLastElement(this.carriages.value)};this.editMode==="edit"&&this.routeForUpdating?(this.routeFacade.updateRoute(G({id:this.routeForUpdating?.id},e)),window.scrollTo({top:0,behavior:"smooth"})):this.editMode==="create"&&this.routeFacade.addRoute(e),this.cleanFormPanel(),this.panelService.togglePanel("panelRoute","save")}}};o.\u0275fac=function(i){return new(i||o)},o.\u0275cmp=F({type:o,selectors:[["app-route-form"]],inputs:{editMode:"editMode",routeForUpdating:"routeForUpdating"},standalone:!0,features:[v],decls:19,vars:3,consts:[[1,"route__form","route"],[1,"route__form",3,"formGroup"],[1,"route__form__column"],[1,"route__form__header"],[1,"route__form__subheader"],["formArrayName","selectStations",1,"route__form__fields"],[4,"ngFor","ngForOf"],["formArrayName","selectCarriages",1,"route__form__fields"],["appearance","outline"],["mat-flat-button","",1,"route__form__button",3,"click","disabled"],[1,"route__form__select",3,"selectionChange","formControlName"],[3,"value",4,"ngFor","ngForOf"],[3,"value"]],template:function(i,r){i&1&&(a(0,"div",0)(1,"form",1)(2,"div",2)(3,"h2",3),_(4,"Stations"),s(),a(5,"span",4),_(6,"*min 3 stations"),s(),a(7,"div",5),f(8,Ne,7,4,"div",6),s()(),a(9,"div",2)(10,"h2",3),_(11,"Carriages"),s(),a(12,"span",4),_(13,"*min 3 carriages"),s(),a(14,"div",7),k(15,Ie,7,3,"mat-form-field",8,A),s()()(),a(17,"button",9),C("click",function(){return r.onSubmit()}),_(18," Save "),s()()),i&2&&(p(),l("formGroup",r.routesForm),p(7),l("ngForOf",r.stations.controls),p(7),D(r.carriages.controls),p(2),l("disabled",!r.routesForm.valid))},dependencies:[Se,ge,he,ye,ve,re,P,ue,pe,ae,se,le,me,ce,_e,fe,I],styles:[".route[_ngcontent-%COMP%]{display:flex;flex-direction:column}.route__form[_ngcontent-%COMP%]{display:flex;justify-content:space-evenly;gap:20px;padding:20px}.route__form__column[_ngcontent-%COMP%]{width:50%}.route__form__header[_ngcontent-%COMP%]{font-size:24px;font-weight:600;margin:0}.route__form__subheader[_ngcontent-%COMP%]{font-size:14px;color:#828282}.route__form__fields[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px;margin-top:15px}.route__form__button[_ngcontent-%COMP%]{width:120px;height:50px;background-color:#2169c1;color:#fff;font-size:16px;align-self:flex-end}mat-form-field[_ngcontent-%COMP%]{width:80%}"]});let t=o;return t})();var Pe=["panelRoute"],Le=["*"],Ee=(()=>{let o=class o{constructor(){this.panelService=u(y),this.editMode="create",this.routeForUpdating=null,this.subscriptions=new T}ngAfterViewInit(){this.subscriptions.add(this.panelService.panelState$.subscribe(e=>{e.panelId==="panelRoute"&&(this.panel.expanded&&e.editMode==="save"?this.panel.close():this.panel.open())}))}ngOnDestroy(){this.subscriptions.unsubscribe()}};o.\u0275fac=function(i){return new(i||o)},o.\u0275cmp=F({type:o,selectors:[["app-route-panel"]],viewQuery:function(i,r){if(i&1&&K(Pe,5),i&2){let c;X(c=Y())&&(r.panel=c.first)}},standalone:!0,features:[v],ngContentSelectors:Le,decls:3,vars:0,consts:[["panelRoute",""],["hideToggle",""]],template:function(i,r){i&1&&(H(),a(0,"mat-expansion-panel",1,0),J(2),s())},dependencies:[be,xe]});let t=o;return t})();function Be(t,o){if(t&1){let n=E();a(0,"div")(1,"app-create-button",6),C("clickOnButton",function(){O(n);let i=h();return R(i.openForm())}),s()()}}function Ue(t,o){if(t&1&&(N(0,"app-route-form",7),m(1,"async"),m(2,"async")),t&2){let n,e,i=h();l("editMode",((n=d(1,2,i.formState$))==null?null:n.editMode)||"create")("routeForUpdating",((e=d(2,4,i.formState$))==null?null:e.route)||null)}}function Ve(t,o){t&1&&(a(0,"div",8),N(1,"mat-spinner"),s())}function Ae(t,o){if(t&1&&(a(0,"div",9)(1,"p"),_(2),m(3,"async"),s()()),t&2){let n=h();p(2),w(d(3,1,n.error$))}}function ke(t,o){t&1&&q(0)}function De(t,o){if(t&1&&(z(0),f(1,ke,1,0,"ng-container",10),W()),t&2){h();let n=Z(15);p(),l("ngTemplateOutlet",n)}}function je(t,o){if(t&1&&(a(0,"li"),N(1,"app-route-item",12),s()),t&2){let n=o.$implicit;p(),l("item",n.route)("carriagesName",n.carriageName)("stationsName",n.stationName)}}function Ge(t,o){if(t&1&&(a(0,"ul"),f(1,je,2,3,"li",11),m(2,"async"),s()),t&2){let n=h();p(),l("ngForOf",d(2,1,n.routesWithStationsAndCarriages$))}}var It=(()=>{let o=class o{constructor(){this.routeFacade=u(U),this.carriageFacade=u(B),this.stationFacade=u(L),this.panelService=u(y),this.subscription=new T,this.formState$=this.panelService.panelState$,this.carriages$=this.carriageFacade.carriage$,this.routes$=this.routeFacade.routes$,this.stations$=this.stationFacade.station$,this.error$=this.routeFacade.error$,this.isLoading$=this.routeFacade.isLoading$}ngOnInit(){this.subscription.add(this.routes$.pipe(Q(e=>{(!e||e.length===0)&&this.routeFacade.loadRoutes()})).subscribe()),this.routesWithStationsAndCarriages$=$([this.routes$,this.carriages$,this.stations$]).pipe(b(([e,i,r])=>e.map(c=>{let g=[],S=[];return c.carriages.forEach(M=>{let x=i.find(V=>V.code===M);x&&g.push(x?.name)}),c.path.forEach(M=>{let x=r.find(V=>V.id===M);x&&S.push(x?.city)}),{route:c,carriageName:g,stationName:S}})))}openForm(){this.panelService.togglePanel("panelRoute","create")}ngOnDestroy(){this.subscription.unsubscribe()}};o.\u0275fac=function(i){return new(i||o)},o.\u0275cmp=F({type:o,selectors:[["app-route-list"]],standalone:!0,features:[v],decls:16,vars:19,consts:[["routes",""],[1,"route"],[4,"ngIf"],[3,"editMode","routeForUpdating",4,"ngIf"],["class","route__spinner",4,"ngIf"],["class","route__error",4,"ngIf"],[3,"clickOnButton"],[3,"editMode","routeForUpdating"],[1,"route__spinner"],[1,"route__error"],[4,"ngTemplateOutlet"],[4,"ngFor","ngForOf"],[3,"item","carriagesName","stationsName"]],template:function(i,r){if(i&1&&(a(0,"div",1),f(1,Be,2,0,"div",2),m(2,"async"),m(3,"async"),a(4,"app-route-panel"),f(5,Ue,3,6,"app-route-form",3),m(6,"async"),s(),f(7,Ve,2,0,"div",4),m(8,"async"),f(9,Ae,4,3,"div",5),m(10,"async"),f(11,De,2,1,"ng-container",2),m(12,"async"),m(13,"async"),f(14,Ge,3,3,"ng-template",null,0,te),s()),i&2){let c;p(),l("ngIf",((c=d(2,5,r.formState$))==null?null:c.editMode)!=="create"&&!d(3,7,r.isLoading$)),p(4),l("ngIf",!d(6,9,r.isLoading$)),p(2),l("ngIf",d(8,11,r.isLoading$)),p(2),l("ngIf",d(10,13,r.error$)),p(2),l("ngIf",!d(12,15,r.isLoading$)&&!d(13,17,r.error$))}},dependencies:[ie,I,Ce,Fe,P,$e,oe,Me,Ee,Re],styles:[".route[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin:50px}.route__spinner[_ngcontent-%COMP%]{position:absolute;top:50%;left:60%;transform:translate(-50%,-60%)}"]});let t=o;return t})();export{It as RouteListComponent};

!function(e){var t={};function a(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,a),s.l=!0,s.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)a.d(n,s,function(t){return e[t]}.bind(null,s));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=4)}([function(e,t){e.exports=React},function(e,t){e.exports=firebase},function(e,t,a){"use strict";a.d(t,"d",(function(){return i})),a.d(t,"b",(function(){return o})),a.d(t,"e",(function(){return c})),a.d(t,"c",(function(){return m})),a.d(t,"a",(function(){return d}));var n=a(0),s=a.n(n),r=a(1),l=a.n(r);l.a.initializeApp({apiKey:"AIzaSyCWzFat3oUpn_4TtOpDCMhcOD2Qf4u1Mr4",authDomain:"crack-atlas-251509.firebaseapp.com",databaseURL:"https://crack-atlas-251509.firebaseio.com",projectId:"crack-atlas-251509",storageBucket:"crack-atlas-251509.appspot.com",messagingSenderId:"646437940818",appId:"1:646437940818:web:080ff48019a68c74d3b98b",measurementId:"G-QLHKJ38SWW"}),l.a.analytics();const i=l.a;var o=l.a.auth(),c=l.a.storage(),m=l.a.firestore();class d extends s.a.Component{constructor(e){super(e),this.state={uid:"",mail_addr:"",mail_pass:""},setInterval(()=>{o.currentUser?this.state.uid!=o.currentUser.uid&&this.setState({uid:o.currentUser.uid}):""!=this.state.uid&&this.setState({uid:""})},100)}signup(e=this.state.mail_addr,t=this.state.mail_pass){o.createUserWithEmailAndPassword(e,t).catch(e=>{alert("error_code:"+e.code+"\nerror_message:"+e.message)})}signin(e=this.state.mail_addr,t=this.state.mail_pass){o.signInWithEmailAndPassword(e,t).catch(e=>{alert("error_code:"+e.code+"\nerror_message:"+e.message)})}easyin(e="a@b.com",t="asdfgh"){o.signInWithEmailAndPassword(e,t).catch(()=>{this.signup(e,t)})}reset_pass(e=this.state.mail_addr){o.sendPasswordResetEmail(e).then(()=>{alert("SEND_EMAIL!")}).catch(e=>{alert("error_code:"+e.code+"\nerror_message:"+e.message)})}delete_user(){window.confirm("Are you really DELETE:USER?\n")?o.currentUser.delete().then(()=>{alert("ACCOUNT_DELETED!")}).catch(e=>{alert("error_code:"+e.code+"\nerror_message:"+e.message)}):alert("Canceled")}google_login(){o.signInWithPopup(new l.a.auth.GoogleAuthProvider).then().catch(e=>{alert("error_code:"+e.code+"\nerror_message:"+e.message)})}accountmodal_render(e,t){let a="mygape_modal_"+e,n="#"+a;return t=t.bind(this),s.a.createElement("div",null,s.a.createElement("button",{type:"button",className:"btn btn-primary btn-sm mx-1","data-toggle":"modal","data-target":n},e),s.a.createElement("div",{className:"modal fade",id:a,role:"dialog","aria-hidden":"true"},s.a.createElement("div",{className:"modal-dialog modal-lg",role:"document"},s.a.createElement("div",{className:"modal-content"},s.a.createElement("div",{className:"modal-header"},s.a.createElement("h5",{className:"modal-title"},e)),s.a.createElement("div",{className:"modal-body row"},s.a.createElement("input",{type:"text",name:"mail_addr",className:"form-control col-6",placeholder:"mail_address",onChange:e=>{this.setState({mail_addr:e.target.value})}}),s.a.createElement("input",{type:"text",name:"mail_pass",className:"form-control col-6",placeholder:"set_password",onChange:e=>{this.setState({mail_pass:e.target.value})}})),s.a.createElement("div",{className:"modal-footer"},s.a.createElement("button",{type:"button",className:"btn btn-primary","data-dismiss":"modal",onClick:t},"Submit"),s.a.createElement("button",{type:"button",className:"btn btn-secondary","data-dismiss":"modal"},"Close"))))))}render(){return s.a.createElement("div",{className:"bg-light p-2"},""==this.state.uid?s.a.createElement("div",{className:"d-flex justify-content-between"},s.a.createElement("h5",null,"サービスを利用するには、ログインしてください"),s.a.createElement("div",{className:"ml-auto"},s.a.createElement("div",{className:"form-inline"},s.a.createElement("input",{type:"button",value:"Googleでログイン",className:"btn btn-success mx-1 btn-sm",onClick:()=>{this.google_login()}}),this.accountmodal_render("Sign_in",this.signin),this.accountmodal_render("Sign_up",this.signup),s.a.createElement("button",{type:"button",className:"btn btn-warning mx-1 btn-sm",onClick:()=>{this.easyin()}},"Easy_login")))):s.a.createElement("div",{className:"d-flex justify-content-between"},s.a.createElement("div",{className:"form-inline"},o.currentUser.photoURL?s.a.createElement("img",{src:o.currentUser.photoURL,alt:"user.photoURL",width:"64",height:"64"}):s.a.createElement("div",null),o.currentUser.displayName?s.a.createElement("h6",null,"ようこそ ",o.currentUser.displayName," さん"):s.a.createElement("h6",null,"ようこそ ",o.currentUser.email," さん")),s.a.createElement("div",{className:"form-inline"},s.a.createElement("button",{type:"button",className:"btn btn-secondary btn-sm mx-1",onClick:()=>{o.signOut()}},"logout"),s.a.createElement("button",{type:"button",className:"btn btn-warning btn-sm mx-1","data-toggle":"modal","data-target":"#account_modal_config"},"config"),s.a.createElement("div",{className:"modal fade",id:"account_modal_config",role:"dialog","aria-hidden":"true"},s.a.createElement("div",{className:"modal-dialog",role:"document"},s.a.createElement("div",{className:"modal-content"},s.a.createElement("div",{className:"modal-header"},s.a.createElement("h5",{className:"modal-title"},"Config")),s.a.createElement("div",{className:"modal-body row"},s.a.createElement("input",{type:"text",name:"mail_addr",className:"form-control col-12",placeholder:"send mail for password_reset"})),s.a.createElement("div",{className:"modal-footer"},s.a.createElement("button",{type:"button",className:"btn btn-sm btn-warning","data-dismiss":"modal",onClick:()=>{this.reset_pass()}},"password_RESRT"),s.a.createElement("button",{type:"button",className:"btn btn-sm btn-danger","data-dismiss":"modal",onClick:()=>{this.delete_user()}},"USER_DELETE"),s.a.createElement("button",{type:"button",className:"btn btn-secondary","data-dismiss":"modal"},"Close"))))))))}}},function(e,t){e.exports=ReactDOM},function(e,t,a){"use strict";a.r(t),a.d(t,"Mypage_tsx",(function(){return o}));var n=a(0),s=a.n(n),r=a(3),l=a.n(r),i=a(2);class o extends s.a.Component{constructor(e){super(e),this.state={uid:"",image_url:"No_Image",nickname:"窓の民は名無し",pr:"私はJhon_Doe。窓の蛇遣いです。",accessed_by:"FB"},this.update_profile=this.update_profile.bind(this),setInterval(()=>{i.b.currentUser?this.state.uid!=i.b.currentUser.uid&&this.setState({uid:i.b.currentUser.uid}):""!=this.state.uid&&this.setState({uid:""})},200)}componentDidMount(){this.load_profile()}componentDidUpdate(e,t){this.state.uid!=t.uid&&this.load_profile()}load_profile(){if(""==this.state.uid)return;const e=i.c.doc("mypage/"+this.state.uid);e.get().then(t=>{if(t.exists)this.setState(t.data());else{let t=JSON.parse(JSON.stringify(this.state));delete t.uid,e.set(t),this.setState(t)}})}update_profile(){if(""==this.state.uid)return;const e=i.c.doc("mypage/"+this.state.uid);e.get().then(t=>{if(t.exists){let t=JSON.parse(JSON.stringify(this.state));delete t.uid,e.set(t)}})}icon_download(){return i.e.ref("mypage/"+this.state.uid+"/icon.img").getDownloadURL().then(e=>{this.state.image_url!=e&&this.setState({image_url:e})}).catch(()=>{"no image"!=this.state.image_url&&this.setState({image_url:"No_Image"})}),s.a.createElement("div",null,s.a.createElement("img",{src:this.state.image_url,alt:this.state.image_url,width:"200",height:"200"}))}icon_upload(){let e=i.e.ref("mypage/"+this.state.uid+"/icon.img");return s.a.createElement("div",null,s.a.createElement("button",{type:"button",className:"btn btn-outline-success btn-sm",onClick:e=>{$(e.currentTarget.children[0]).click()}},"Upload_Icon",s.a.createElement("input",{type:"file",className:"d-none",onChange:t=>{window.confirm("Are you really submitting?\n"+t.target.files[0].name)&&e.put(t.target.files[0]),this.setState({})},accept:"image/jpeg,image/png"})))}render_changebutton(e,t){let a="mygape_modal_"+e,n="#"+a;return s.a.createElement("div",null,s.a.createElement("button",{type:"button",className:"btn btn-outline-success btn-sm mx-1","data-toggle":"modal","data-target":n},"change"),s.a.createElement("div",{className:"modal fade",id:a,role:"dialog","aria-hidden":"true"},s.a.createElement("div",{className:"modal-dialog modal-lg",role:"document"},s.a.createElement("div",{className:"modal-content"},s.a.createElement("div",{className:"modal-header"},s.a.createElement("h5",{className:"modal-title"},e)),s.a.createElement("div",{className:"modal-body row"},s.a.createElement("textarea",{className:"form-control col-12",value:this.state[t],onChange:e=>{this.setState({[t]:e.target.value})}})),s.a.createElement("div",{className:"modal-footer"},s.a.createElement("button",{type:"button",className:"btn btn-sm btn-success","data-dismiss":"modal",onClick:this.update_profile},"SUBMIT"),s.a.createElement("button",{type:"button",className:"btn btn-secondary","data-dismiss":"modal"},"Close"))))))}render(){return s.a.createElement("div",null,""==this.state.uid?s.a.createElement("h4",{className:"d-flex justify-content-center"},"This application cant use without login"):s.a.createElement("div",null,s.a.createElement("div",{className:"m-2 p-1",style:{background:"khaki"}},s.a.createElement("h4",{className:"d-flex justify-content-between"},s.a.createElement("div",null,this.state.nickname),s.a.createElement("div",{className:"ml-auto"},s.a.createElement("div",{className:"form-inline"},this.render_changebutton("nickname","nickname"),this.icon_upload()))),s.a.createElement("div",{className:"d-flex"},s.a.createElement("div",{className:""},this.icon_download()),s.a.createElement("div",{className:"bg-light m-1"},s.a.createElement("div",{className:"d-flex justify-content-between bg-white m-1"},s.a.createElement("h5",{className:""},"PR"),s.a.createElement("div",{className:"ml-auto"},this.render_changebutton("PR","pr"))),s.a.createElement("h6",{className:""},this.state.pr))))))}}l.a.render(s.a.createElement(i.a,null),document.getElementById("account_tsx")),l.a.render(s.a.createElement(o,null),document.getElementById("mypage_tsx"))}]);
//# sourceMappingURL=mypage.js.map
(this["webpackJsonpreal-project"]=this["webpackJsonpreal-project"]||[]).push([[19],{1010:function(t,e,a){"use strict";a.r(e);a(338);var s,n=a(337),i=(a(1007),a(1005)),r=(a(305),a(309)),o=a(37),c=a(38),l=a(40),u=a(39),d=a(41),p=a(0),h=a.n(p),b=a(51),v=(a(81),a(65)),g=a(118),m=Object(b.b)((function(t){return{avatar:t.user.avatar}}),{avatarUpdate:g.b})(s=function(t){function e(){var t;return Object(o.a)(this,e),(t=Object(l.a)(this,Object(u.a)(e).call(this))).state={isLoading:!1},t}return Object(d.a)(e,t),Object(c.a)(e,[{key:"customRequest",value:function(t){var e=this;this.setState({isLoading:!0}),Object(v.a)(t.file).then((function(t){console.log(t),e.setState({isLoading:!1}),e.props.avatarUpdate(t.data.linkurl)}))}},{key:"render",value:function(){return console.log(this.state.isLoading),h.a.createElement(n.a,{title:"\u4e2a\u4eba\u8bbe\u7f6e",bordered:!1},h.a.createElement(i.a,{style:{border:"1px dashed #dedede",width:80,height:80,display:"block"},showUploadList:!1,customRequest:this.customRequest.bind(this)},h.a.createElement(r.a,{spinning:this.state.isLoading},this.props.avatar?h.a.createElement("img",{src:this.props.avatar}):h.a.createElement("span",null,"\u70b9\u51fb\u4e0a\u4f20"))))}}]),e}(p.Component))||s;e.default=m}}]);
//# sourceMappingURL=19.ac9a3720.chunk.js.map
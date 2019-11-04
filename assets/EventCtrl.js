
let DefaultAnimsEnum = cc.Enum({ '<None>': 0 });
let CustomAnimsEnum = cc.Enum({ '<None>': 0 ,'a':1,'b':2,'c':3});

function setEnumAttr (obj, propName, enumDef) {
    // cc.log('EventCtrl-> ',propName);
    cc.Class.attr(obj, propName, {
        type: 'Enum',
        enumList: cc.Enum.getList(enumDef)
    });
}


let EventNames = cc.Enum({
    待机: -1,
    移动: -1,
    坐下: -1,
});

let ActionPack = cc.Class({
    name:'ActionPack',
    properties:{
        _spineAnimIdx: 0,
        spineAnim: {
            type: DefaultAnimsEnum,
            displayName: 'Spine 动作',
            get(){
                return this._spineAnimIdx;
            },
            set(v){
                this._spineAnimIdx = v;
            },
        },
        actionAnim: {
            displayName: 'Animation 动作',
            default: '',
            
        },
        event: {
            displayName: '触发事件',
            default: '',
            
        },
    },
    ctor(){
        
    },
});

let EventPack = cc.Class({
    name:'EventPack',
    properties:{
        eventName: {
            displayName: '事件名',
            default: EventNames.待机,
            type: EventNames,
        },
        actionPacks: {
            default: [],
            type: [ActionPack],
            displayName: '动作列表',
            serializable: false,

        }
    },
});



cc.Class({
    extends: cc.Component,
    editor:{
        executeInEditMode: true,
    },
    properties: {
        eventPacks:{
            default: [],
            type: [EventPack],
            displayName: '事件列表',
            
            notify(){
                //当 eventPacks 的元素个数发生改变 做刷新处理
                //但是执行 _refresh 之后  _animIdx 枚举下拉条 没有发生改变
                // MagicSprite.js 脚本组件会执行正确的逻辑
                CC_EDITOR && this._refresh();
            }
        },
        
        _idx: 0,
        _animIdx:{
            type: DefaultAnimsEnum,
            visible: true,
            displayName: 'anim',
            get(){
                return this._idx;
            },
            set(v){
                this._idx = v;
            }
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
     
    },

    start () {
     
    },
    
    // refresh: CC_EDITOR && function() {
    //     // let eventPacks = this.eventPacks;
    //     // let animsEnum = this.getAnimsEnum();
    //     // DefaultAnimsEnum = animsEnum;
    //     // cc.log('EventCtrl->refresh ',eventPacks.length,animsEnum);
    //     // cc.log('DefaultAnimsEnum EventCtrl->refresh ',eventPacks.length,DefaultAnimsEnum);

    //     // for (let i = 0; i < eventPacks.length; i++) {
    //     //     const eventPack = eventPacks[i];
    //     //     let actionPacks = eventPack.actionPacks;
    //     //     cc.log('EventCtrl->actionPacks: ',actionPacks.length);
            
    //     //     for (let j = 0; j < actionPacks.length; j++) {
    //     //         const actionPack = actionPacks[j];
    //     //         cc.log('EventCtrl->refresh setEnumAttr');                
    //     //         setEnumAttr(actionPack,'_spineAnimIdx',animsEnum);
    //     //     }
    //     // }

    // //   let spine = this.getComponent(sp.Skeleton);
    // //     if(spine && spine.skeletonData){
    // //         let enums = spine.skeletonData.getAnimsEnum();
    // //         cc.log('EventCtrl-> refresh',enums);
    // //         setEnumAttr(this,'_animIdx',enums);
    // //     } 
        
    //     CC_EDITOR && this._refresh();
        
    //     // setEnumAttr(this,'anim',animsEnum);
    // },

    //获取 spine 动作枚举
    getAnimsEnum(){
        let animsEnum = DefaultAnimsEnum;
        let spine = this.getComponent(sp.Skeleton);
        if(spine && spine.skeletonData){
            let enums = spine.skeletonData.getAnimsEnum();
            animsEnum = enums || DefaultAnimsEnum;
        } 
        return animsEnum;
    },
    
    //刷新下拉条
    _refresh() {
        let spine = this.getComponent(sp.Skeleton);
        if(spine && spine.skeletonData){
            let enums = spine.skeletonData.getAnimsEnum();
            cc.log('EventCtrl-> _refresh');            
            setEnumAttr(this,'_animIdx',enums || DefaultAnimsEnum);
        } 
    },


    __preload: CC_EDITOR && function() {
        //加载的时候执行_refresh ，_animIdx下拉条会发生改变 
        this._refresh();
    },



    // update (dt) {},
});

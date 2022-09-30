//--------------------------------------------《全局函数-开始》--------------------------------------------
//动态调用函数
function ApplyCallback(fn,args){
    fn.apply(this, args);
}
function JSCallback(fn,args){
    ApplyCallback(eval(fn),args);
}

//往String对象里加入去空格函数
String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.ltrim=function(){
    return this.replace(/(^\s*)/g,"");
}
String.prototype.rtrim=function(){
    return this.replace(/(\s*$)/g,"");
}
//往String对象里加入替换全部函数
String.prototype.replaceAll = function(oldString,newString){
    return this.replace(new RegExp(oldString,"gm"),newString);
}

function isOwnEmpty(obj)
{
    for(var name in obj)
    {
        if(obj.hasOwnProperty(name))
        {
            return false;//返回false，不为空对象
        }
    }
    return true;//返回true，为空对象
}
//--------------------------------------------《全局函数-结束》--------------------------------------------
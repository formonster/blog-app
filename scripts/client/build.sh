#!/bin/bash

#Func:cp files include directory
#Author:reed

cross-env SM=true webpack --mode production

# 删除 js 文件中的 sourcemap 注释
find dist -name "*.js"|xargs sed -i '' '\/\/# sourceMappingURL/d'

. /etc/profile

SourcePath="dist"
DestPath="/Users/for/Desktop/Work/Blog/server/sourcemap/"

#mkdir backup directory
[ ! -d $DestPath ] && mkdir -p $DestPath

Func_CpFiles()
{
    for FileList in $(find $SourcePath -name "*.js.map");do
        echo $FileList
        #mkdir
        [ ! -d ${DestPath}$(dirname $FileList) ] && mkdir -p ${DestPath}$(dirname ${FileList#*/})
        #copy
        mv -f $FileList ${DestPath}$(dirname ${FileList#*/})
    done
}

Func_CpFiles
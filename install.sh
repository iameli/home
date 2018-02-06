#!/bin/bash
SYMLINK_ME=".bash_profile .bashrc .gitignore_global .gitconfig .screenrc .slate .vimrc"

for sym in $SYMLINK_ME; do
    echo $sym
done
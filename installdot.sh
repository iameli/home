#!/bin/bash

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
FILES=".bash_profile .bashrc .gitconfig .gitignore_global .npmrc .screenrc .slate .vimrc"

for file in $FILES; do
  ln -s "$DIR/$file" "$HOME/$file"
done
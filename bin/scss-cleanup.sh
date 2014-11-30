export temp_file="`uuidgen`.sass"
sass-convert --from SCSS --to SASS $1 $temp_file
rm $1
sass-convert --from SASS --indent 4 --to SCSS $temp_file $1
rm $temp_file

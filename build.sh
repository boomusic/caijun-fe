#!/bin/sh

output_dir='_output'

if [ -d ${output_dir} ]; then
    rm -rf ${output_dir}
fi
mkdir ${output_dir} ${output_dir}/js ${output_dir}/css ${output_dir}/img

for dir in $(ls)
do
    if [ -d ${dir} ]; then
        if [ ${dir} != 'template' ] && [ ${dir} != 'lib' ] && [ ${dir} != ${output_dir} ] && [ ${dir} != 'doc' ]; then
            mkdir ${output_dir}/img/${dir}
            if [ -d ${dir}/img ]; then
                cp -r ${dir}/img/* ${output_dir}/img/${dir}
            fi
            cp -r ${dir}/*.less ${output_dir}/css
            cp -r ${dir}/*.css ${output_dir}/css
            cp -r ${dir}/*.js ${output_dir}/js
            cp -r ${dir}/*.html ${output_dir}
        fi
    fi
done
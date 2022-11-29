input_file=$1 
if [  -z $input_file  ] ; then
  echo "No pokh filename provided. Please provide one!"
  exit 1
fi

node src/parse.js $input_file
node src/generate.js ${input_file%.pokh}.ast
node ${input_file%.pokh}.js
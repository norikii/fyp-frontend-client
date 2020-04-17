START=$(pwd)

protoc: protoc-js

protoc-js:
	mkdir -p pb/js
	protoc -I pb/v1/ \
	--js_out=import_style=commonjs:pb/js \
	--grpc-web_out=import_style=commonjs,mode=grpcwebtext:pb/js \
	pb/v1/*.proto


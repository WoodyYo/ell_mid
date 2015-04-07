#include <node.h>
#include <v8.h>

#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <termios.h>
#include <string.h>
#include <unistd.h>
#include <errno.h>
#include <stdbool.h>
#include <limits.h>
#include <sys/select.h>
#include <math.h>


using namespace v8;

Handle<Value> Method(const Arguments& args) {
	HandleScope scope;
	return scope.Close(String::New("hello,world"));
}

void init(Handle<Object> exports) {
	exports->Set(String::NewSymbol("accelerator"),
			FunctionTemplate::New(Method)->GetFunction());
}

NODE_MODULE(accelerator, init);

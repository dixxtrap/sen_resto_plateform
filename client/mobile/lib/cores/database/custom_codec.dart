import 'dart:convert';

class CustomCodec implements Codec<String, String> {

  @override
  String decode(String encoded) {
    // TODO: implement decode
    throw UnimplementedError();
  }

  @override
  // TODO: implement decoder
  Converter<String, String> get decoder => throw UnimplementedError();

  @override
  String encode(String input) {
    // TODO: implement encode
    throw UnimplementedError();
  }

  @override
  // TODO: implement encoder
  Converter<String, String> get encoder => throw UnimplementedError();

  @override
  Codec<String, R> fuse<R>(Codec<String, R> other) {
    // TODO: implement fuse
    throw UnimplementedError();
  }

  @override
  // TODO: implement inverted
  Codec<String, String> get inverted => throw UnimplementedError();



}
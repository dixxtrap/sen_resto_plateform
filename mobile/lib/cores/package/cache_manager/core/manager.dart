import 'dart:convert';
import 'package:crypto/crypto.dart';
import 'package:mobile/cores/package/cache_manager/store/store_disk.dart';
import 'package:mobile/cores/package/cache_manager/store/store_impl.dart';
import 'package:mobile/cores/package/cache_manager/store/store_memory.dart';
import 'config.dart';
import 'obj.dart';

class CacheManager {
  final CacheConfig _config;
  ICacheStore? _diskCacheStore;
  ICacheStore? _memoryCacheStore;
  late Utf8Encoder _utf8encoder;

  CacheManager(this._config) {
    _utf8encoder = const Utf8Encoder();
    if (!_config.skipDiskCache) {
      _diskCacheStore = _config.diskStore ??
          MyDiskCacheStore(encrypt: _config.encrypt, decrypt: _config.decrypt);
    }
    if (!_config.skipMemoryCache) {
      _memoryCacheStore = MemoryCacheStore(_config.maxMemoryCacheCount);
    }
  }

  Future<CacheObj?> _pullFromCache(String key, {String? subKey}) async {
    key = _convertMd5(key);
    if (null != subKey) subKey = _convertMd5(subKey);
    var obj = await _memoryCacheStore?.getCacheObj(key, subKey: subKey);
    if (null == obj) {
      obj = await _diskCacheStore?.getCacheObj(key, subKey: subKey);
      if (null != obj) await _memoryCacheStore?.setCacheObj(obj);
    }
    if (null != obj) {
      var now = DateTime.now().millisecondsSinceEpoch;
      if (null != obj.maxStaleDate && obj.maxStaleDate! > 0) {
        //if maxStaleDate exist, Remove it if maxStaleDate expired.
        if (obj.maxStaleDate! < now) {
          await delete(key, subKey: subKey);
          return null;
        }
      } else {
        //if maxStaleDate NOT exist, Remove it if maxAgeDate expired.
        if (obj.maxAgeDate! < now) {
          await delete(key, subKey: subKey);
          return null;
        }
      }
    }
    return obj;
  }

  Future<CacheObj?> pullFromCacheBeforeMaxAge(String key,
      {String? subKey}) async {
    var obj = await _pullFromCache(key, subKey: subKey);
    if (null != obj &&
        null != obj.maxAgeDate &&
        obj.maxAgeDate! < DateTime.now().millisecondsSinceEpoch) {
      return null;
    }
    return obj;
  }

  Future<CacheObj?> pullFromCacheBeforeMaxStale(String key,
      {String? subKey}) async {
    return await _pullFromCache(key, subKey: subKey);
  }

  Future<bool> pushToCache(CacheObj obj) {
    obj.key = _convertMd5(obj.key);
    if (null != obj.subKey) obj.subKey = _convertMd5(obj.subKey!);

    if (null == obj.maxAgeDate || obj.maxAgeDate! <= 0) {
      obj.maxAge = _config.defaultMaxAge;
    }
    if (null == obj.maxAgeDate || obj.maxAgeDate! <= 0) {
      return Future.value(false);
    }
    if ((null == obj.maxStaleDate || obj.maxStaleDate! <= 0) &&
        null != _config.defaultMaxStale) {
      obj.maxStale = _config.defaultMaxStale;
    }

    return _getCacheFutureResult(_memoryCacheStore, _diskCacheStore,
        _memoryCacheStore?.setCacheObj(obj), _diskCacheStore?.setCacheObj(obj));
  }

  Future<bool> delete(String key, {String? subKey}) {
    key = _convertMd5(key);
    if (null != subKey) subKey = _convertMd5(subKey);

    return _getCacheFutureResult(
        _memoryCacheStore,
        _diskCacheStore,
        _memoryCacheStore?.delete(key, subKey: subKey),
        _diskCacheStore?.delete(key, subKey: subKey));
  }

  Future<bool> clearExpired() {
    return _getCacheFutureResult(_memoryCacheStore, _diskCacheStore,
        _memoryCacheStore?.clearExpired(), _diskCacheStore?.clearExpired());
  }

  Future<bool> clearAll() {
    return _getCacheFutureResult(_memoryCacheStore, _diskCacheStore,
        _memoryCacheStore?.clearAll(), _diskCacheStore?.clearAll());
  }

  String _convertMd5(String str) {
    return hex(md5.convert(_utf8encoder.convert(str)).bytes);
  }

  String hex(List<int> bytes) {
    final buffer = StringBuffer();
    for (var part in bytes) {
      if (part & 0xff != part) {
        throw FormatException('$part is not a byte integer');
      }
      buffer.write('${part < 16 ? '0' : ''}${part.toRadixString(16)}');
    }
    return buffer.toString().toUpperCase();
  }

  Future<bool> _getCacheFutureResult(
      ICacheStore? memoryCacheStore,
      ICacheStore? diskCacheStore,
      Future<bool>? memoryCacheFuture,
      Future<bool>? diskCacheFuture) async {
    var result1 =
        (null == memoryCacheStore) ? true : (await memoryCacheFuture!);
    var result2 = (null == diskCacheStore) ? true : (await diskCacheFuture!);
    return result1 && result2;
  }
}

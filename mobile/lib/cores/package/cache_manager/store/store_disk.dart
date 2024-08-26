
import 'package:mobile/cores/database/data_base.dart';
import 'package:mobile/cores/package/cache_manager/core/config.dart';
import 'package:mobile/cores/package/cache_manager/core/obj.dart';
import 'package:mobile/cores/package/cache_manager/store/store_impl.dart';
import 'package:sembast/sembast.dart';

class MyDiskCacheStore extends ICacheStore {

  final _store = stringMapStoreFactory.store("app");
  Encrypt? encrypt;
  Decrypt? decrypt;

  MyDiskCacheStore({this.encrypt, this.decrypt});

  Future<Database> get _db async => await AppDatabase.instance.database;

  @override
  Future<CacheObj?> getCacheObj(String key, {String? subKey}) async {
    final finder = Finder(filter: Filter.byKey(key));
    var snapshot = await _store.findFirst(await _db, finder: finder);
    if (snapshot != null)
      return _decryptCacheObj(CacheObj.fromJson(snapshot.value));
    else
      return null;
  }

  @override
  Future<bool> setCacheObj(CacheObj obj) async {
    obj.content = await _encryptCacheStr(obj.content);
    obj.headers = await _encryptCacheStr(obj.headers);

    await _store.record(obj.key).put(await _db, obj.toJson());
    return true;
  }

  @override
  Future<bool> delete(String key, {String? subKey}) async {
    final finder = Finder(filter: Filter.byKey(key));
    int count = await _store.delete(await _db, finder: finder);
    return count > 0;
  }

  @override
  Future<bool> clearExpired() async {
    return false;
  }

  @override
  Future<bool> clearAll() async {
    int count = await _store.delete(await _db);
    return count > 0;
  }

  Future<CacheObj> _decryptCacheObj(CacheObj obj) async {
    obj.content = await _decryptCacheStr(obj.content);
    obj.headers = await _decryptCacheStr(obj.headers);
    return obj;
  }

  Future<List<int>?> _decryptCacheStr(List<int>? bytes) async {
    if (null == bytes) return null;
    if (null != decrypt) {
      bytes = await decrypt!(bytes);
    }
    return bytes;
  }

  Future<List<int>?> _encryptCacheStr(List<int>? bytes) async {
    if (null == bytes) return null;
    if (null != encrypt) {
      bytes = await encrypt!(bytes);
    }
    return bytes;
  }
}

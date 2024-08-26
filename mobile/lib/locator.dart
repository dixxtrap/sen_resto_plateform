import 'package:get_it/get_it.dart';
import 'package:mobile/cores/networking/api_client.dart';
import 'package:mobile/cores/package/cache_manager/core/config.dart';
import 'package:mobile/cores/package/cache_manager/manager_dio.dart';
import 'package:mobile/cores/package/cache_manager/store/store_disk.dart';
import 'package:mobile/cores/services/navigation/navigation_service.dart';
import 'package:mobile/cores/services/preferences_service.dart';

GetIt locator = GetIt.instance;
void configureLocator() {
  locator.registerLazySingleton(() => ApiClient());
  locator.registerLazySingleton(() => Navigation());
  locator.registerLazySingleton(() => PreferencesService());
  locator.registerLazySingleton(
    () => DioCacheManager(
      CacheConfig(
        baseUrl: ApiClient.baseUrl,
        diskStore: MyDiskCacheStore(),
      ),
    ),
  );
}

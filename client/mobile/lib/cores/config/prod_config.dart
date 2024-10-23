/*
 * Copyright ©2022. PayNet Systems. All Rights Reserved.
 */

import 'base_config.dart';

class ProdConfig implements BaseConfig {
  @override
  String get baseUrl => 'https://mobile.kpay-apps.com/rest/';

  @override
  String get imageUrl => 'https://web.kpay-apps.com/image?id=';

  @override
  bool get reportErrors => false;

  @override
  bool get trackEvents => false;

  @override
  bool get useHttps => true;

  @override
  String get envName => '';

  @override
  String get migrationBaseUrl => 'https://rover.kpay-apps.com/';
}

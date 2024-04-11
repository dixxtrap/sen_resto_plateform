/*
 * Copyright ©2022. PayNet Systems. All Rights Reserved.
 */

import 'base_config.dart';

class DevConfig implements BaseConfig {
  @override
  String get baseUrl => 'https://192.168.1.133:3000/v1/';
  // String get baseUrl => 'http://10.10.80.39:3000/v1';

  @override
  String get imageUrl => 'http://192.168.1.133:3000/v1/';

  @override
  bool get reportErrors => false;

  @override
  bool get trackEvents => false;

  @override
  bool get useHttps => false;

  @override
  String get envName => 'Dev Environment';

  @override
  String get migrationBaseUrl => 'https://devrover.niookobok.com/';
}

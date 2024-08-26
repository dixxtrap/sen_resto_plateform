/*
 * Copyright ©2022. PayNet Systems. All Rights Reserved.
 */

import 'package:mobile/cores/config/prod_config.dart';
import 'package:mobile/cores/config/uat_config.dart';

import 'base_config.dart';
import 'dev_config.dart';

class Environment {
  factory Environment() {
    return _singleton;
  }

  Environment._internal();

  static final Environment _singleton = Environment._internal();

  static const String DEV = 'DEV';
  static const String UAT = 'UAT';
  static const String PROD = 'PROD';

  BaseConfig config = UatConfig();

  initConfig(String environment) {
    config = _getConfig(environment);
  }

  BaseConfig _getConfig(String environment) {
    switch (environment) {
      case Environment.PROD:
        return ProdConfig();
      case Environment.UAT:
        return UatConfig();
      case Environment.DEV:
        return DevConfig();
      default:
        return ProdConfig();
    }
  }
}

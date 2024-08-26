/*
 * Copyright ©2021. PayNet Systems. All Rights Reserved.
 */

import 'package:flutter/foundation.dart';

class Logger {
  static void d(Object message) {
    if (kDebugMode) print('\x1B[36m $message \x1B[0m');
  }
}

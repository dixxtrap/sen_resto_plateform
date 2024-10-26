import 'package:flutter/material.dart';
import 'package:mobile/utils/helper/kprint.dart';

moveFocus(BuildContext context, FocusNode currentFocus, FocusNode nextFocus) {
  kprint("---------------------move focus---------------------");
  currentFocus.unfocus();
  FocusScope.of(context).requestFocus(nextFocus);
}

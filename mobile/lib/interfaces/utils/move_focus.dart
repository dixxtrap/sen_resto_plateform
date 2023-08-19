import 'package:flutter/material.dart';
import 'package:mobile/interfaces/utils/kprint.dart';

moveFocus(BuildContext context, FocusNode currentFocus, FocusNode nextFocus) {
  kprint("---------------------move focus---------------------");
  currentFocus.unfocus();
  FocusScope.of(context).requestFocus(nextFocus);
}

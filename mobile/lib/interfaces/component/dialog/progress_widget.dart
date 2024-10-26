/*
 * Copyright ©2021. PayNet Systems. All Rights Reserved.
 */

import 'package:flutter/material.dart';
import 'package:mobile/utils/color_ressources.dart';

class ProgressWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () => Future<bool>.value(false),
      child: const Scaffold(
        extendBody: true,
        backgroundColor: ColorResources.PROGRESS_COLOR,
        body: Center(
            child: CircularProgressIndicator(
          strokeWidth: 2,
        )),
      ),
    );
  }
}

/*
 * Copyright ©2021. PayNet Systems. All Rights Reserved.
 */

import 'dart:async';

import 'package:flutter/material.dart';
import 'package:mobile/interfaces/base/base_state.dart';
import 'package:mobile/utils/color_ressources.dart';
import 'package:mobile/utils/helper/constant.dart';
import 'package:mobile/utils/style.dart';

abstract class AppBarState<T extends StatefulWidget>
    extends BaseScaffoldState<T> {
  final StreamController _titleStreamController = StreamController();

  AppBar appBar() => AppBar(
        elevation: 0,
        backgroundColor: ColorResources.WHITE_COLOR,
        centerTitle: true,
        actions: appBarActions(),
        leading: InkWell(
          onTap: () => navigation.pop(),
          child: const Icon(
            Icons.arrow_back,
            color: ColorResources.BLACK_COLOR,
          ),
        ),
        iconTheme: const IconThemeData(
          color: ColorResources.BLACK_COLOR,
        ),
        title: StreamBuilder(
          initialData: "$APP_NAME",
          stream: _titleStreamController.stream,
          builder: (ctx, snapshot) => Text(
            "${snapshot.data}",
            style: AppStyle.poppinsBold(
                color: ColorResources.BLACK_COLOR, fontSize: 20),
          ),
        ),
      );

  List<Widget>? appBarActions() => null;

  set setTitle(String title) {
    _titleStreamController.add(title);
  }

  @override
  void dispose() {
    super.dispose();
    _titleStreamController.close();
  }
}

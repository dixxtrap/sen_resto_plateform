/*
 * Copyright ©2021. PayNet Systems. All Rights Reserved.
 */

import 'package:flutter/material.dart';
import 'package:mobile/cores/services/navigation/navigation_service.dart';
import 'package:mobile/utils/color_ressources.dart';

import '../../../locator.dart';

abstract class BaseState<T extends StatefulWidget> extends State<T> {
  final Navigation navigation = locator<Navigation>();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) {
      postBuild();
      onViewCreated(context);
    });
  }

  @override
  Widget build(BuildContext context) {
    return contentView(context);
  }

  AppBar? appBar() => null;

  Widget contentView(BuildContext context);

  void postBuild() {}

  onViewCreated(BuildContext context) {}
}

abstract class BaseScaffoldState<T extends StatefulWidget>
    extends BaseState<T> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ColorResources.GHOST_WHITE_COLOR,
      appBar: appBar(),
      body: contentView(context),
    );
  }
}

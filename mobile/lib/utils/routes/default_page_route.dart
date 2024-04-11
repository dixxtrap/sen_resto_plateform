/*
 * Copyright ©2021. PayNet Systems. All Rights Reserved.
 */

import 'package:flutter/material.dart';
import 'package:mobile/utils/color_ressources.dart';

class DefaultPageRoute<T> extends PageRoute<T> {
  DefaultPageRoute(this.child);

  @override
  Color get barrierColor => ColorResources.TRANSPARENT_COLOR;

  @override
  String? get barrierLabel => null;

  final Widget child;

  @override
  Widget buildPage(BuildContext context, Animation<double> animation,
      Animation<double> secondaryAnimation) {
    return SlideTransition(
      position: Tween<Offset>(
        begin: const Offset(0, 1),
        end: Offset.zero,
      ).animate(animation),
      child: child,
    );
  }

  @override
  bool get maintainState => true;

  @override
  Duration get transitionDuration => Duration(milliseconds: 300);
}

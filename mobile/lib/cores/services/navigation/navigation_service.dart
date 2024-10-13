/*
 * Copyright ©2021. PayNet Systems. All Rights Reserved.
 */

import 'package:flutter/material.dart';
import 'package:mobile/utils/routes/default_page_route.dart';

class Navigation {
  final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();

  Future pushAndRemoveUntil(Widget page, {bool delay = false}) async {
    if (delay) await _addDelay();
    return navigatorKey.currentState!.pushAndRemoveUntil(
        DefaultPageRoute(page), (Route<dynamic> route) => false);
  }

  Future push(Widget page, {bool delay = false}) async {
    if (delay) await _addDelay();
    return navigatorKey.currentState!.push(DefaultPageRoute(page));
  }

  Future pushReplacement(Widget page, {bool delay = false}) async {
    if (delay) await _addDelay();
    return navigatorKey.currentState!.pushReplacement(DefaultPageRoute(page));
  }

  Future navigateViaRoute(PageRoute route, {bool delay = false}) async {
    if (delay) await _addDelay();
    return navigatorKey.currentState?.push(route);
  }

  void pop() {
    navigatorKey.currentState?.pop();
  }

  Future _addDelay() async {
    await Future.delayed(const Duration(milliseconds: 100));
  }
}

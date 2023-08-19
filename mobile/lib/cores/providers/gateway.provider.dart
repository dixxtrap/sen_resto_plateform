import 'package:flutter/material.dart';
import 'package:mobile/cores/gateway.dart';
import 'package:mobile/cores/model/company.dart';
import 'package:mobile/cores/model/restaurant.dart';
import 'package:mobile/cores/model/tag.dart';
import '../model/plat.dart';
import "package:flutter_riverpod/flutter_riverpod.dart";

final gatewayProvider = ChangeNotifierProvider<GatewayNotifier>((ref) {
  return GatewayNotifier();
});

class GatewayNotifier extends ChangeNotifier {
  List<Plat>? plates;
  List<Restaurant>? restaurant;
  List<Company>? companies;
  List<Tag>? tags;

  getData({bool refresh = false}) async {
    try {
      if (refresh) {
        tags = await Gateway.getTag();
        plates = await Gateway.getPlat();
        restaurant = await Gateway.getRestos();
        companies = await Gateway.getCompany();
      }
      plates ??= await Gateway.getPlat();
      restaurant ??= await Gateway.getRestos();
      companies ??= await Gateway.getCompany();
      tags ??= await Gateway.getTag();

      notifyListeners();
    } catch (e) {}
  }
}

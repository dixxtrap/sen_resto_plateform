import "dart:convert";

import "package:http/http.dart" as http;
import "package:mobile/cores/env.dart";
import "package:mobile/cores/model/company.dart";
import "package:mobile/cores/model/customer.dart";
import "package:mobile/cores/model/plat.dart";
import "package:mobile/cores/model/restaurant.dart";
import "package:mobile/cores/model/tag.dart";
import "package:mobile/interfaces/utils/kprint.dart";
import "package:mobile/session.dart";

class Gateway {
  static const String baseUrl = Env.baseUrl;
  static var header = {"Authorization": "Bearer ${Session.token}"};
// Methode Get
  static Future<Customer> getUser(String phone) async {
    kprint('-------------------------getLogin-----------------');
    http.Response response =
        await http.get(Uri.parse("$baseUrl/customer/token/772371668"));
    kprint(response.body);
    if ([200, 201].contains(response.statusCode)) {
      return Customer.fromJson(jsonDecode(response.body));
    } else {
      throw new Error();
    }
  }

  static Future<List<Restaurant>> getRestos() async {
    kprint('-------------------------get Restaurant-----------------');
    http.Response response = await http.get(
        Uri.parse("$baseUrl/restaurant/particulier"),
        headers: {"Authoriszation": "Bearer ${Session.token}"});
    kprint(response.body);
    if ([200, 201].contains(response.statusCode)) {
      return (jsonDecode(response.body) as List)
          .map((e) => Restaurant.fromJson(e))
          .toList();
    } else {
      throw new Error();
    }
  }

  static Future<List<Company>> getCompany() async {
    kprint('-------------------------Company get-----------------');
    http.Response response =
        await http.get(Uri.parse("$baseUrl/company"), headers: header);
    kprint(response.body);
    if ([200, 201].contains(response.statusCode)) {
      return (jsonDecode(response.body) as List)
          .map((e) => Company.fromJson(e))
          .toList();
    } else {
      throw new Error();
    }
  }

  static Future<List<Tag>> getTag() async {
    kprint('-------------------------getTag-----------------');
    http.Response response =
        await http.get(Uri.parse("$baseUrl/tag"), headers: header);
    kprint(response.body);
    if ([200, 201].contains(response.statusCode)) {
      return (jsonDecode(response.body) as List)
          .map((e) => Tag.fromJson(e))
          .toList();
    } else {
      throw new Error();
    }
  }

  static Future<List<Plat>> getPlatByRestaurant(int id) async {
    kprint('-------------------------get restaurant-----------------');
    http.Response response = await http
        .get(Uri.parse("$baseUrl/plate/restaurant/$id"), headers: header);
    kprint(response.body);
    if ([200, 201].contains(response.statusCode)) {
      return (jsonDecode(response.body) as List)
          .map((e) => Plat.fromJson(e))
          .toList();
    } else {
      throw new Error();
    }
  }

  static Future<List<Plat>> getPlat() async {
    kprint('-------------------------plat-----------------');
    kprint(Session.token);
    http.Response response =
        await http.get(Uri.parse("$baseUrl/plate"), headers: header);
    kprint(response.body);
    if ([200, 201].contains(response.statusCode)) {
      return (jsonDecode(response.body) as List)
          .map((e) => Plat.fromJson(e))
          .toList();
    } else {
      throw new Error();
    }
  }
}

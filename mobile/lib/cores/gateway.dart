import "dart:convert";

import "package:http/http.dart" as http;
import "package:mobile/cores/model/company.dart";
import "package:mobile/cores/model/customer.dart";
import "package:mobile/cores/model/plat.dart";
import "package:mobile/cores/model/restaurant.dart";
import "package:mobile/cores/model/tag.dart";
import "package:mobile/interfaces/utils/kprint.dart";

class Gateway {
  static final String baseUrl = "http://192.168.43.149:3001/v1";
// Methode Get
  static Future<Customer> getUser(String phone) async {
    kprint('-------------------------login-----------------');
    http.Response response =
        await http.get(Uri.parse("$baseUrl/customer/token/$phone"));
    kprint(response.body);
    if ([200, 201].contains(response.statusCode)) {
      return Customer.fromJson(jsonDecode(response.body));
    } else {
      throw new Error();
    }
  }

  static Future<List<Restaurant>> getRestos() async {
    kprint('-------------------------login-----------------');
    http.Response response =
        await http.get(Uri.parse("$baseUrl/restaurant/particulier"));
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
    kprint('-------------------------login-----------------');
    http.Response response = await http.get(Uri.parse("$baseUrl/company"));
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
    kprint('-------------------------login-----------------');
    http.Response response = await http.get(Uri.parse("$baseUrl/tag"));
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
    kprint('-------------------------login-----------------');
    http.Response response =
        await http.get(Uri.parse("$baseUrl/plate/restaurant/$id"));
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
    kprint('-------------------------login-----------------');
    http.Response response = await http.get(Uri.parse("$baseUrl/plate"));
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

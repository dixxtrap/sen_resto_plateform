import 'package:mobile/cores/model/customer.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Session {
  static String? phone;
  static String? displayName;
  static int? id;
  static num? laltitude;
  static num? longitude;
  static String? token;
  static StateOfKyc? stateOfKyc;
  static final Future<SharedPreferences> _prefs =
      SharedPreferences.getInstance();
  static setPhone(String i) async {
    phone = i;
    (await _prefs).setString("phone", i);
  }

  static setDisplayName(String i) async {
    displayName = i;
    (await _prefs).setString("displayName", i);
  }

  static setToken(String i) async {
    token = i;
    (await _prefs).setString("token", i);
  }

  static setLaltitude(double i) async {
    laltitude = i;
    (await _prefs).setDouble("laltitude", i);
  }

  static setLongitude(double i) async {
    longitude = i;
    (await _prefs).setDouble("longitude", i);
  }

  static setStateOfKyc(StateOfKyc i) async {
    (await _prefs).setInt("stateOfKyc", StateOfKyc.values.indexOf(i));
  }

  static setId(int i) async {
    (await _prefs).setInt("id", i);
  }

  static loadData() async {
    displayName = (await _prefs).getString("displayName");
    phone = (await _prefs).getString("phone");
    laltitude = (await _prefs).getDouble("laltitude");
    longitude = (await _prefs).getDouble("longitude");
    id = (await _prefs).getInt("id");
    token = (await _prefs).getString("token");
    stateOfKyc = StateOfKyc.values[(await _prefs).getInt("stateOfKyc") ?? 0];
  }

  static refreshCustomer(Customer c) async {
    await setId(c.id!);
    await setPhone(c.phone!);
    await setDisplayName(c.displayName!);
    await setToken(c.token!);
    await setLaltitude(c.laltitude!);
    await setLongitude(c.longitude!);
  }

  resetData() async {
    displayName = null;
    phone = null;
    stateOfKyc = null;
    laltitude = null;
    longitude = null;
    id = null;
  }
}

enum StateOfKyc { notStarted, initiate, verify }

enum DayOfWeek {
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
}

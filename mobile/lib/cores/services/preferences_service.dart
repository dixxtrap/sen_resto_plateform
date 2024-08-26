import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:mobile/cores/model/customer_data.dart';
import 'package:mobile/cores/model/otp_verification_response.dart';

class PreferencesService {
  final String _keyIsLogin = 'isLogin';
  final String _keyToken = 'token';
  final String _keyFisrtname = 'firstname';
  final String _keyLastname = 'lastname';
  final String _keyPhone = 'phone';
  final String _keySetup = 'setup';
  final _storage = const FlutterSecureStorage();

  Future<bool> get isLogIn async {
    return await _storage.read(key: _keyIsLogin) == 'true';
  }

  Future<String?> get token async {
    return await _storage.read(key: _keyToken);
  }

  Future<String?> get phone async {
    return await _storage.read(key: _keyPhone);
  }

  Future<String?> get setup async {
    return await _storage.read(key: _keySetup);
  }

  Future<void> setPhone(String phone) async {
    return await _storage.write(key: _keyPhone, value: phone);
  }

  Future<void> setSetup(StateOfSetup setup) async {
    return await _storage.write(key: _keySetup, value: setup.name);
  }

  Future<String?> get firstname async {
    return await _storage.read(key: _keyFisrtname);
  }

  Future<String?> get lastname async {
    return await _storage.read(key: _keyLastname);
  }

  updateData(OtpVerificationResponse data) async {
    if (data.customer?.firstname != null) {
      await _storage.write(key: _keyFisrtname, value: data.customer?.firstname);
    }
    if (data.customer?.lastname != null) {
      await _storage.write(key: _keyLastname, value: data.customer?.lastname!);
    }
    if (data.customer?.phone != null) {
      await _storage.write(key: _keyPhone, value: data.customer?.phone!);
    }
    await _storage.write(key: _keyIsLogin, value: 'true');
    await _storage.write(key: _keySetup, value: StateOfSetup.completed.name);
    if (data.token != null) {
      await _storage.write(key: _keyToken, value: data.token);
    }
  }
}

enum StateOfSetup {
  notStarted,
  registered,
  otpVerified,
  completed,
}

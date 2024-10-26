import 'package:mobile/cores/model/base_response.dart';
import 'package:mobile/cores/model/company.dart';

class CompanyResponse extends BaseResponse {
  late final List<Company> data;
  CompanyResponse.fromJson(Map<String, dynamic> json) {
    data = [];
    var jsonData = json['data'];

    jsonData.forEach((element) {
      data.add(Company.fromJson(element));
    });
  }
}

import 'package:mobile/cores/networking/api_result.dart';

abstract class TagRepository {
  Future<ApiResult> tags();
}

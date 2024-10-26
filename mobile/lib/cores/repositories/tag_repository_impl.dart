import 'package:mobile/cores/networking/api_client.dart';
import 'package:mobile/cores/networking/api_result.dart';
import 'package:mobile/cores/repositories/tag_repository.dart';

class TagRepositoryImpl implements TagRepository {
  final ApiClient apiClient;

  TagRepositoryImpl(this.apiClient);
  
  @override
  Future<ApiResult> tags() {
    // TODO: implement tags
    throw UnimplementedError();
  }
}

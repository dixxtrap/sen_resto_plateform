import 'package:mobile/cores/model/banner_response.dart';
import 'package:mobile/cores/networking/api_result.dart';

abstract class BannerRepository {
  Future<ApiResult<BannerResponse>> banners();
}

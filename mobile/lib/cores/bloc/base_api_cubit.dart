/*
 * Copyright ©2021. PayNet Systems. All Rights Reserved.
 */

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/cores/networking/result_state.dart';

import '../model/base_response.dart';

class ApiCubit<R extends BaseResponse> extends Cubit<ResultState<R>> {
  ApiCubit() : super(const Idle());
}

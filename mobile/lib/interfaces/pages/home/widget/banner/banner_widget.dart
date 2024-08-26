import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/cores/bloc/banner_cubit.dart';
import 'package:mobile/cores/model/banner_response.dart';
import 'package:mobile/cores/networking/api_client.dart';
import 'package:mobile/cores/networking/network_exceptions.dart';
import 'package:mobile/cores/networking/result_state.dart';
import 'package:mobile/cores/repositories/banner_repository_impl.dart';
import 'package:mobile/interfaces/pages/home/widget/banner/banner_item.dart';
import 'package:mobile/locator.dart';
import 'package:mobile/utils/color_ressources.dart';

class bannerWidget extends StatefulWidget {
  const bannerWidget({super.key});

  @override
  State<bannerWidget> createState() => _bannerWidgetState();
}

class _bannerWidgetState extends State<bannerWidget> {
  final BannerCubit _banerCubit =
      BannerCubit(BannerRepositoryImpl(locator<ApiClient>()));
  @override
  void initState() {
    super.initState();

    _banerCubit.banners();
  }

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => _banerCubit,
      child: BlocBuilder<BannerCubit, ResultState<BannerResponse>>(
        bloc: _banerCubit,
        builder: (context, state) {
          return state.when(
              idle: () {
                return const Center(
                  child: CircularProgressIndicator(),
                );
              },
              loading: () {
                return const Center(
                  child: CircularProgressIndicator(),
                );
              },
              data: (data) {
                return Container(
                    height: 130,
                    decoration:
                        const BoxDecoration(color: ColorResources.WHITE_SMOKE),
                    child: PageView.builder(
                        itemCount: data.data.length,
                        itemBuilder: (context, i) => BannerItem(
                              banner: data.data[i],
                            )));
              },
              error: (NetworkExceptions err) => Center(
                    child: Text(
                      NetworkExceptions.getErrorMessage(err),
                    ),
                  ));
        },
      ),
    );
  }
}

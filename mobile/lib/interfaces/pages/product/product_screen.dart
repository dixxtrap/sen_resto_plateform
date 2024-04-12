import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/cores/bloc/product_cubit.dart';
import 'package:mobile/cores/model/product_repose.dart';
import 'package:mobile/cores/networking/api_client.dart';
import 'package:mobile/cores/networking/network_exceptions.dart';
import 'package:mobile/cores/networking/result_state.dart';
import 'package:mobile/cores/repositories/product_repository_impl.dart';
import 'package:mobile/interfaces/component/custom_input.dart';
import 'package:mobile/interfaces/component/dialog/progress_widget.dart';
import 'package:mobile/interfaces/component/product/product_widget.dart';
import 'package:mobile/interfaces/pages/page_with_bottom_navigator_bar.dart';
import 'package:mobile/locator.dart';
import 'package:mobile/utils/color_ressources.dart';
import 'package:mobile/utils/helper/assets_svg.dart';
import 'package:mobile/utils/helper/constant.dart';

import 'package:mobile/utils/helper/svg_icon.dart';

class ProductsScreen extends StatefulWidget {
  const ProductsScreen({super.key});

  @override
  State<ProductsScreen> createState() => _SearchState();
}

class _SearchState extends State<ProductsScreen> {
  final ProductCubit _productCubit =
      ProductCubit(ProductRepositoryImpl(locator<ApiClient>()));
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) {
      setState(() {});
      _productCubit.products();
    });
  }

  @override
  Widget build(BuildContext context) {
    return PageWithBottomNavigator(
      currentIndex: 1,
      body: Container(
          height: double.maxFinite - MediaQuery.of(context).viewPadding.bottom,
          child: Column(
            children: [
              const SizedBox(
                height: kpadding / 2,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(
                    width: kpadding / 4,
                  ),
                  const Expanded(child: CustomInput()),
                  const SizedBox(
                    width: kpadding / 3,
                  ),
                  FilledButton.tonal(
                      style: FilledButton.styleFrom(
                          minimumSize: Size.zero,
                          fixedSize: Size(45, 45),
                          padding: EdgeInsets.all(3),
                          shape: RoundedRectangleBorder(
                              borderRadius:
                                  BorderRadius.circular(kpadding / 4))),
                      onPressed: () {},
                      child: const SvgIcon(
                        AssetSvg.searchFill,
                        size: 30,
                        color: ColorResources.PRIMARY_APP_COLOR,
                      ))
                ],
              ),

              Expanded(
                child: BlocProvider(
                    create: (context) => _productCubit,
                    child:
                        BlocBuilder<ProductCubit, ResultState<ProductResponse>>(
                      bloc: _productCubit,
                      builder: (BuildContext context, state) {
                        return state.when(
                            idle: () {
                              return SizedBox();
                            },
                            loading: () {
                              return ProgressWidget();
                            },
                            data: (data) {
                              return ListView(
                                children: data.product!
                                    .map((e) => ProductWidgetV2(product: e))
                                    .toList(),
                              );
                            },
                            error: (error) => Center(
                                  child: Text(
                                    NetworkExceptions.getErrorMessage(error),
                                  ),
                                ));
                      },
                    )),
              )
            ],
          )),
    );
  }
}

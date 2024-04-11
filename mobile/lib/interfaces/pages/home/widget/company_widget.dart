import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/cores/bloc/company_api_cubit.dart';
import 'package:mobile/cores/model/company_response.dart';
import 'package:mobile/cores/networking/api_client.dart';
import 'package:mobile/cores/networking/network_exceptions.dart';
import 'package:mobile/cores/networking/result_state.dart';
import 'package:mobile/cores/repositories/company_repository_impl.dart';
import 'package:mobile/cores/services/navigation/navigation_service.dart';
import 'package:mobile/interfaces/component/company_item_widget.dart';
import 'package:mobile/interfaces/pages/company_restaurant/company/company_screen.dart';
import 'package:mobile/interfaces/pages/company_restaurant/restaurant/restaurant_screen.dart';
import 'package:mobile/locator.dart';
import 'package:mobile/utils/helper/assets_img.dart';
import 'package:mobile/utils/helper/cached_img.dart';
import 'package:mobile/utils/helper/constant.dart';
import 'package:mobile/utils/style.dart';

class CompanyWidget extends StatefulWidget {
  const CompanyWidget({super.key});

  @override
  State<CompanyWidget> createState() => _CompanyWidgetState();
}

class _CompanyWidgetState extends State<CompanyWidget> {
  final CompanyCubit _companyCubit =
      CompanyCubit(CompanyRepositoryImpl(locator<ApiClient>()));
  @override
  void initState() {
    super.initState();

    _companyCubit.companies();
  }

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => _companyCubit,
      child: BlocBuilder<CompanyCubit, ResultState<CompanyResponse>>(
        bloc: _companyCubit,
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
                  height: 90,
                  child: PageView.builder(
                      itemCount: data.data.length,
                      pageSnapping: true,
                      controller: PageController(
                        viewportFraction: (1 / 3.5),
                        initialPage: 2,
                      ),
                      itemBuilder: (_, i) {
                        var company = data.data[i];
                        return MaterialButton(
                          padding: EdgeInsets.all(0),
                          onPressed: () {
                            locator<Navigation>()
                                .push(company.type == COMPANY_TYPE
                                    ? CompanyScreen(partner: company)
                                    : RestaurantScreen(
                                        partner: company,
                                      ));
                          },
                          child: Column(
                            children: [
                              const SizedBox(
                                height: kSpaceM,
                              ),
                              SizedBox(
                                width: getWidth(context) / 4,
                                height: 50,
                                child: CachedImage(
                                    identifier:
                                        '$APP_NAME-company-${company.id!}',
                                    placeHolder: AssetImg.restaurant,
                                    url: company.imagePath!),
                              ),
                              Text(
                                company.shortname!,
                                style: AppStyle.poppinsRegular(),
                              )
                            ],
                          ),
                        );
                      }),
                );
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

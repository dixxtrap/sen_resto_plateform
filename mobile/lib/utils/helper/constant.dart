import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:mobile/cores/services/navigation/navigation_service.dart';
import 'package:mobile/locator.dart';

ThemeData getTheme(context) => Theme.of(context);
double getWidth(context) => MediaQuery.of(context).size.width;
double getHeight(context) => MediaQuery.of(context).size.height;
TextTheme getTextTheme(context) => Theme.of(context).textTheme;
Color onBackground(context) => Theme.of(context).colorScheme.onBackground;
Color background(context) => Theme.of(context).colorScheme.background;

const double kpadding = 20;
final RoundedRectangleBorder roundedButton =
    RoundedRectangleBorder(borderRadius: BorderRadius.circular(kpadding / 4));
Color borderColor(context) => onBackground(context).withOpacity(.1);
const String kCountryCode = '221';

class TransactionTypeId {
  static const String COUNTRY_CODE = "221";
  static const String WALLET_RECHARGE = "1";
  static const String FUND_TRANSFER_ID = "34";
  static const String SALARY_TO_MEMBER_SELF_TRANSFER_ID = "64";
  static const String MERCHANT_TO_MEMBER_SELF_TRANSFER_ID = "87";
  static const String CASH_OUT_ID = "35";
  static const String MERCHANT_PAY_ID = "43";
  static const String NON_REGISTERED_VOUCHER_ID = "38";
  static const String MOBILE_TOPUP_ID = "39";
  static const String TV_TNT = "44";
  static const String WATER_SENEAU_ID = "45";
  static const String ELECTRICITY_WOYOFAL = "55";
  static const String ELECTRICITY_SENELEC = "60";
  static const String ORANGE_MONEY = "58";
  static const String WAVE = "59";
  static const String FREE = "67";
  static const String SEOH = "69";
  static const String ORA_BANK_ID = "57";
  static const String WAVE_TO_KPAY_ID = "62";
  static const String ORANGE_MONEY_TO_KPAY_ID = "63";
  static const String FREE_MONEY_TO_KPAY_ID = "66";
  static const String RAPIDO_ID = "61";
  static const String XEWEUL_ID = "56";
  static const String AQUATECH_ID = "68";
  static const String TOUBA_CA_KANAM_ID = "85";

  static String get fundTransfer {
    return FUND_TRANSFER_ID;
  }

  static String get merchant_pay {
    return MERCHANT_PAY_ID;
  }

  static String get cashOut {
    return CASH_OUT_ID;
  }

  static String get nonRegisteredVoucherTransfer {
    return NON_REGISTERED_VOUCHER_ID;
  }

  static String get topUpTransfer {
    return MOBILE_TOPUP_ID;
  }

  static String get tntTransfer {
    return TV_TNT;
  }

  static String get seneauTransfer {
    return WATER_SENEAU_ID;
  }

  static String get woyofalTransfer {
    return ELECTRICITY_WOYOFAL;
  }

  static String get senelecTransfer {
    return ELECTRICITY_SENELEC;
  }

  static String get rapidoRecharge {
    return RAPIDO_ID;
  }

  static String get orangeMoney {
    return ORANGE_MONEY;
  }

  static String get wave {
    return WAVE;
  }

  static String get free {
    return FREE;
  }

  static String get oraBankId {
    return ORA_BANK_ID;
  }

  static String get wave_deposit_Id {
    return WAVE_TO_KPAY_ID;
  }

  static String get orange_money_deposit_Id {
    return ORANGE_MONEY_TO_KPAY_ID;
  }

  static String get free_money_deposit_Id {
    return FREE_MONEY_TO_KPAY_ID;
  }

  static String get xeweulPayment {
    return XEWEUL_ID;
  }

  static String get aquaTechTransfer {
    return AQUATECH_ID;
  }

  static String get seoh {
    return SEOH;
  }

  // static String get selfTransfer {
  //   switch (locator<InitialData>().profile.userType) {
  //     case Profile.HYBRID_MERCHANT:
  //       return MERCHANT_TO_MEMBER_SELF_TRANSFER_ID;
  //     default:
  //       return SALARY_TO_MEMBER_SELF_TRANSFER_ID;
  //   }
  // }

  static String get toubaCaKanamTransfer {
    return TOUBA_CA_KANAM_ID;
  }
}

String? sessionId;
var deviceInfos;
var navigation = locator<Navigation>();

//home screen spacing and size
const double homeButtonSize = 50;
const double kSpaceS = 8.0;
const double kSpaceM = 16.0;
const defaultPadding = 10.0;

//PIN length
const maxPinLength = 6;
const maxOtpLength = 6;

//Regular text field text length
const regularFieldMaxLength = 500;
const amountFieldMaxLength = 10;
const maxMobileLength = 9;
const maxCodeLength = 12;
const contactMaxLength = 9;
const buttonClickDelayed = 10;
const regularMobileLength = 9;
const maxRequestPaymentLimit = 10000;

//country code
const countryCode = "+221";

//KYC enum
const String KYC_DOC_ONE = "KYC_DOC_ONE";
const String KYC_DOC_TWO = "KYC_DOC_TWO";
const String KYC_DOC_THREE = "KYC_DOC_THREE";
const String PASSPORT = "PASSPORT";
const String NATIONAL_ID = "NATIONAL_ID";

//TransferType
const String FUND_TRANSFER = "Fund Transfer";
const String CASH_OUT = "CashOut";
const String FUND_TRANSFER_PAYMENT = "Pay";
const String FUND_TRANSFER_REQUEST = "Request";
const String MERCHANT_PAYMENT = "Merchant Payment";
const String MOBILE_TOPUP = "TopUp";
const String SENEAU = "Sen'Eau";
const String TNT = "TNT";
const String VOUCHER_PAYMENT = "Non Registered Voucher Payment";
const String WOYOFAL_PAYMENT = "Woyofal";
const String SENELEC_PAYMENT = "Senelec";
const String AQUATECH_PAYMENT = "Aquatech";
const String SEOH = "SEOH";
const String TOUBA_CA_KANAM = "Touba Ca Kanam";

//Other Wallets
const String TRANSFER_ORANGE_MONEY = "Transfer to Orange Money";
const String TRANSFER_WAVE = "Transfer to Wave";
const String TRANSFER_FREE = "Transfer to Free Money";

//Payment Methods
enum PaymentType { WALLET, CARD }

const String PAYMENT_THROUGH_WALLET = "Mon Kpay";
// const String PAYMENT_THROUGH_WALLET = "Wallet";
// Wallet
const String MEMBER_WALLET = "Member Wallet";
const String SALARY_WALLET = "Salary Wallet";
const String MERCHANT_WALLET = "Merchant Wallet";
const String APP_NAME = 'sen-resto';
//Mobile Number prefix
const orange_one = 77;
const orange_two = 78;
const free = 76;
const proMobile = 75;
const expresso = 70;
const restaurantType = 'Restaurant';
const COMPANY_TYPE = 'CompanyRestaurant';

const String ORANGE = "Orange";
const String FREE = "Free";
const String PRO_MOBILE = "Pro Mobile";
const String EXPRESSO = "Expresso";

List<String> operatorList = operators
    .map((key, value) {
      return MapEntry(key, key);
    })
    .values
    .toList();

Map<String, String> operators = {
  tr("Orange"): "1",
  tr("Free"): "2",
  tr("Pro Mobile"): "3",
  tr("Expresso"): "4",
};
//REQUEST STATUS
const String OPEN = "OPEN";
const String CANCEL = "CANCEL";
const String REJECTED = 'REJECTED';
const String EXPIRED = 'EXPIRED';

class BillPayInternalName {
  static const String TOPUP = "TOPUP";
  static const String TV = "TV";
  static const String ELECTRICITY = "ELECTRICITY";
  static const String WATER = "WATER";
  static const String GAS_BILL = "GAS";
  static const String DTH = "DTH";
  static const String CARD = "CREDIT_CARD";
  static const String RAPIDO = "RAPIDO";
  static const String VoucherPay = "VOUCHER_PAY";
}

class CustomFieldInternalName {
  static const String REF_NO = "REFNO";
  static const String TV_SUBSCRIPTION = "SUBSCRIPTION";
  static const String TV_PERIOD = "PERIOD";
  static const String NAME = "NAME";
  static const String FAMILY_NAME = "FAMILYNAME";
  static const String INVOICE_NUMBER = "INVOICENUMBER";
  static const String NOTIFY_NO = "NOTIFY_NO";
}

extension Masking on String {
  String mobileNumberMasking() {
    if (length == regularMobileLength) {
      return "XXXXX${substring(5, 9)}";
    } else {
      return this;
    }
  }

  String emailAddressMasking() {
    int index = indexOf("@");
    String endId = substring(index);
    String mask = '';
    int size = substring(2, index).length;
    for (int i = 0; i < size; i++) {
      mask += "*";
    }
    mask = substring(0, 2) + mask + endId;
    return mask;
  }
}

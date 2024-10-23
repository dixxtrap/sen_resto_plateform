class Address {
  String? streetAddress;
  String? city;
  String? country;
  String? postalCode;

  Address({this.streetAddress, this.city, this.country, this.postalCode});

  Address.fromJson(Map<String, dynamic> json) {
    streetAddress = json['streetAddress'];
    city = json['city'];
    country = json['country'];
    postalCode = json['postalCode'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['streetAddress'] = streetAddress;
    data['city'] = city;
    data['country'] = country;
    // data['postalCode'] = postalCode;
    return data;
  }
}

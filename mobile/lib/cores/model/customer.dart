class Customer {
  int? id;
  String? phone;
  bool? isPhoneVeirified;
  String? displayName;
  double? laltitude;
  double? longitude;
  String? updatedAt;
  String? createdAt;
  String? token;

  Customer(
      {this.id,
      this.phone,
      this.isPhoneVeirified,
      this.displayName,
      this.laltitude,
      this.longitude,
      this.updatedAt,
      this.createdAt,
      this.token});

  Customer.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    phone = json['phone'];
    isPhoneVeirified = json['isPhoneVeirified'];
    displayName = json['displayName'];
    laltitude = json['laltitude'];
    longitude = json['longitude'];
    updatedAt = json['updatedAt'];
    createdAt = json['createdAt'];
    token = json['token'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = id;
    data['phone'] = phone;
    data['isPhoneVeirified'] = isPhoneVeirified;
    data['displayName'] = displayName;
    data['laltitude'] = laltitude;
    data['longitude'] = longitude;
    data['updatedAt'] = updatedAt;
    data['createdAt'] = createdAt;
    data['token'] = token;
    return data;
  }
}

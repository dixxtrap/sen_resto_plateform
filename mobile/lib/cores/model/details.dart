class Details {
  String? createdAt;
  String? updatedAt;
  int? byId;

  Details({this.createdAt, this.updatedAt, this.byId});

  Details.fromJson(Map<String, dynamic> json) {
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    if (json['byId'] != null) byId = json['byId'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['createdAt'] = createdAt;
    data['updatedAt'] = updatedAt;
    data['byId'] = byId;
    return data;
  }
}

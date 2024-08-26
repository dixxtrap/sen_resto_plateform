class ProductFile {
  int? id;
  String? path;
  bool? idActive;
  int? productId;

  ProductFile({this.id, this.path, this.idActive, this.productId});

  ProductFile.fromJson(Map<String, dynamic> json) {
    print(json);
    id = json['id'];
    path = json['path'];
    idActive = json['idActive'];
    productId = json['productId'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};

    data['id'] = id;
    data['path'] = path;
    data['idActive'] = idActive;
    data['productId'] = productId;
    return data;
  }
}

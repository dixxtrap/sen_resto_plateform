class ProductCategory {
  int? id;
  String? name;
  int? parentId;

  ProductCategory({this.id, this.name, this.parentId});

  ProductCategory.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    name = json['name'];
    parentId = json['parentId'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['name'] = name;
    data['parentId'] = parentId;
    return data;
  }
}

import { HttpException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { permissions } from 'src/data/permission.data';
import { roleData } from 'src/data/role.data';
import { CompanyDto } from 'src/dto/company.dto';
import { PermissionDto } from 'src/dto/permission.dto';
import { PermissionRoleDto, RoleDto } from 'src/dto/role.dto';
import { Permission, Role } from 'src/typeorm';
import { Repository } from 'typeorm';

export class PermissionService implements OnModuleInit {
  constructor(
    @InjectRepository(Permission)
    private permissionRepos: Repository<Permission>,
    @InjectRepository(Role)
    private roleRepos: Repository<Role>,
  ) {}
  onModuleInit() {
    console.log(
      '-------------create permission --------------',
      process.env.API_KEY,
    );
    try {
      //  this.onInitRole();
      //  this.onInit();
    } catch (e) {}
  }
  async onInit() {
    try {
      await Promise.all(
        permissions.map(async (permission) => {
          try {
            await this.createPermission(permission);
          } catch (error) {}
        }),
      );
    } catch (error) {}
  }
  async createRole(role: RoleDto) {
    const r = await this.roleRepos.create(role);
    return this.roleRepos.save(r);
  }
  async getRoleByName(name: string, scope: string) {
    return await this.roleRepos.findOne({
      where: { name: name, scope: scope },
    });
  }
  async getRole() {
    return await this.roleRepos.find();
  }
  async getRoleUser(search: string) {
    return await this.roleRepos.find({
      select: {
        user: {
          pin: false,
          encryptedPin: false,
          email: true,
          city: true,
          country: true,
          birthday: true,
          phone: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      where: { name: search.toUpperCase() },
      relations: {
        user: true,
        permission: true,
      },
    });
  }
  // async createRolePermissions(permissionRoles: PermissionRoleDto[]) {
  //   try {
  //     await permissionRoles.forEach(
  //       async (e) => await this.createRolePermission(e),
  //     );
  //     return 'yes';
  //   } catch (error) {
  //     console.log(error);
  //     throw new HttpException({ ...error }, 500);
  //   }
  // }
  // async createRolePermission(permissionRole: PermissionRoleDto) {
  //   try {
  //    const oldPR = await this.permiRoleRepos.findOne({
  //       where: {
  //         roleId: permissionRole.roleId,
  //         perm issionId: permissionRole.permissionId,
  //         id: permissionRole.id,
  //       },
  //     });

  //     if (permissionRole.id && oldPR) {
  //       await this.permiRoleRepos.update(
  //         { id: permissionRole.id },
  //         { isActive: permissionRole.isActive },
  //       );
  //       return { ...oldPR, ...permissionRole };
  //     }
  //     return await this.permiRoleRepos.save(
  //       this.permiRoleRepos.create(permissionRole),
  //     );
  //   } catch (error) {
  //     // console.log(error);
  //     // throw new HttpException({ ...error }, 500);
  //   }
  // }
  async getRolePermission(id: number) {
    return await this.roleRepos.findOne({
      where: {
        id: id,
      },
      relations: {
        permission: true,

        user: true,
      },
    });
  }
  // TODO: ROLE
  async onInitRole() {
    Promise.all(
      await roleData.map(async (permission) => {
        try {
          await this.createRole(permission);
        } catch (error) {}
      }),
    );
  }

  //TODO: PERMISSION
  async createPermission(permisionTdo: PermissionDto): Promise<Permission> {
    try {
      const permissionDoc = this.permissionRepos.create(permisionTdo);
      const savedPermission = await this.permissionRepos.save(permissionDoc);
      return savedPermission;
    } catch (error) {
      // console.log(error);
    }
  }

  async getPermissions(): Promise<Permission[]> {
    const permissions = await this.permissionRepos.find();
    return permissions;
  }
}

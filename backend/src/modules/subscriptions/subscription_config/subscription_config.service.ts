import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SubscriptionDTO } from "./subscription.dto";
import { Subscription } from "src/entidades/subscription.entity";


@Injectable()
export class SubscriptionService {
    constructor(
        @InjectRepository(Subscription)
        private subscriptionConfigRepository: Repository<Subscription>,
    ) { }

    async get(): Promise<SubscriptionDTO> {
        return await this.subscriptionConfigRepository.find()[0];
    }

    async update(id: number, config: Partial<SubscriptionDTO>) {
        await this.subscriptionConfigRepository.update(id, config);
        return this.subscriptionConfigRepository.find({ where: { id: id } });
    }
}